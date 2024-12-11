import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { getAllCompanies } from "./api/api_company";
import { toast } from "sonner";
import { getRestaurantAccessibility, getHotelAccessibility } from "./api/api_questionnaire";

mapboxgl.accessToken = "pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A";

export default function MapWithPlaces({ onSelectPlace, searchQuery, selectedType, selectedRating, selectedDisability, setMapInstance }) {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const mapContainerRef = useRef(null);
  const markers = useRef([]);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.1332, 19.4326],
      zoom: 12,
    });
    mapInstance.current = map;

    map.on("load", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            new mapboxgl.Marker({ color: "red" })
              .setLngLat([longitude, latitude])
              .addTo(map);
            map.flyTo({ center: [longitude, latitude], zoom: 14 });
          },
          () => toast.error("No se pudo obtener la ubicación actual.")
        );
      }
    });

    setMapInstance(map);

    return () => map.remove(); // Limpieza al desmontar
  }, [setMapInstance]);

  useEffect(() => {
    getAllCompanies()
      .then((data) => setCompanies(data))
      .catch(() => toast.error("Error al obtener establecimientos"));
  }, []);

  useEffect(() => {
    console.log(
      `Filtrando compañías con búsqueda: '${searchQuery}', tipo de giro: '${selectedType}', calificación: '${selectedRating}',  y discapacidad: '${selectedDisability}'`
    );

    let filtered = companies.filter((company) => {
      const companyName = company?.companyName ?? ""; // Si es undefined, usar string vacío
      const companyType = company?.giro ?? ""; // Si es undefined, usar string vacío
      const companyRating = company?.averageRating ?? 0; // Si es undefined, usar 0

      const matchesSearch =
        companyName &&
        companyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        (selectedType === "all" &&
          ["RESTAURANTE", "HOTEL"].includes(companyType)) ||
        (selectedType === "RESTAURANTE" && companyType === "RESTAURANTE") ||
        (selectedType === "HOTEL" && companyType === "HOTEL");

      const matchesRating =
        selectedRating === "all" ||
        (selectedRating === "high" && companyRating >= 4) ||
        (selectedRating === "mid" && companyRating >= 3 && companyRating < 4) ||
        (selectedRating === "low" && companyRating < 3);


        const matchesDisability =
        selectedDisability === "all" ||
        (company.disabilities &&
          company.disabilities.some(
            (disability) => disability.type === selectedDisability
          ));
  
      return matchesSearch && matchesType && matchesRating && matchesDisability;
    });
    
    // Ordenar las compañías filtradas por calificación
    filtered = filtered.sort((a, b) => b.averageRating - a.averageRating);

    console.log("Compañías filtradas y ordenadas:", filtered);
    setFilteredCompanies(filtered);
  }, [searchQuery, selectedType, selectedRating, companies]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = filteredCompanies.map((company) => {
      const { longitude, latitude } = company;
      if (longitude && latitude) {
        const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(mapInstance.current);
        marker.getElement().addEventListener("click", () => onSelectPlace(company));
        return marker;
      }
      return null;
    });
  }, [filteredCompanies, onSelectPlace]);

  return <div ref={mapContainerRef} className="h-[500px] sm:h-full w-full"></div>;
}
