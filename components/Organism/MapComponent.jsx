import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A';

const MapComponent = ({ userLocation }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const directions = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!userLocation || mapRef.current) return;

    const { latitude, longitude } = userLocation;

    if (mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [longitude, latitude],
        zoom: 13,
      });
    }

    mapRef.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');

    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // mapRef.current?.addControl(directions.current, 'top-right');

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <h3 class="font-semibold">Tu ubicación</h3>
            <p>Esta es tu ubicación actual</p>
          </div>`
        )
      )
      .addTo(mapRef.current);
  }, [userLocation]);

  function iniciaSesion() {
    if (localStorage.getItem('token')) {
      router.push("/MapWithPlaces");
    } else {
      toast.error('Inicia sesión para ver la ubicación de las empresas', {
        icon: null,
        duration: 3000, 
        style: {
          background: 'red',
          color: 'white'
        }
      });
    }
  }
  
  
  return (
    <>
      <div
        onClick={iniciaSesion}
        className="w-full h-[400px] rounded-lg shadow-md overflow-hidden"
        ref={mapContainer}
        style={{ height: '400px' }}
      ></div>
      <Toaster />
    </>
  );
};

export default MapComponent;