import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import { toast } from "sonner";

export default function SearchWithGeocoding({ map }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
    if (!map || event.target.value.trim() === "") return; // Validación de mapa

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      event.target.value
    )}.json?access_token=${mapboxgl.accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;

        map.flyTo({
          center: [longitude, latitude],
          zoom: 300,
        });
        toast.success(`Ubicación encontrada: ${data.features[0].place_name}`);
      } else {
        toast.error("No se encontraron resultados para esta búsqueda.");
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      toast.error("Ocurrió un error al buscar la ubicación.");
    }
  };

  return (
    <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
      <label htmlFor="search" className="block text-gray-700 mb-1">
        ¿Dónde buscar?
      </label>
      <input
        type="text"
        id="search"
        placeholder="Buscar lugar..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}