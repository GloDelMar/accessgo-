// components/SearchBar.jsx
import React from "react";

export default function SearchBar({
   selectedType,
  handleTypeChange,
  selectedRating,
  handleRatingChange,
  selectedDisability, // Nuevo prop
  handleDisabilityChange, // Nuevo prop
}) {
  return (
    <div className="flex flex-row w-full justify-between p-4 bg-gray-200">


      {/* Filtro de tipo de giro */}
      <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
        <label htmlFor="businessType" className="block text-gray-700 mb-1">
          Tipo de establecimiento
        </label>
        <select
          id="businessType"
          value={selectedType}
          onChange={handleTypeChange}
          className="border p-2 rounded w-full"
        >
          <option value="all">Todos los establecimientos</option>
          <option value="RESTAURANTE">Restaurante</option>
          <option value="HOTEL">Hotel</option>
        </select>
      </div>

      {/* Filtro de tipo de discapacidad */}
      <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
        <label htmlFor="disability" className="block text-gray-700 mb-1">
          Tipo de discapacidad
        </label>
        <select
          id="disability"
          value={selectedDisability}
          onChange={handleDisabilityChange}
          className="border p-2 rounded w-full"
        >
          <option value="all">Todos los tipos</option>
          <option value="Visual">Visual</option>
          <option value="Auditiva">Auditiva</option>
          <option value="Motriz">Motriz</option>
          <option value="Intelectual">Intelectual</option>
          <option value="Neurodivergente">Neurodivergente</option>
        </select>
      </div>

      {/* Filtro de mejor calificado */}
      <div className="w-full sm:w-1/3">
        <label htmlFor="rating" className="block text-gray-700 mb-1">
          Calificación
        </label>
        <select
          id="rating"
          value={selectedRating}
          onChange={handleRatingChange}
          className="border p-2 rounded w-full"
        >
          <option value="all">Todos</option>
          <option value="high">4 estrellas o más</option>
          <option value="mid">3 estrellas</option>
          <option value="low">2 estrellas o menos</option>
        </select>
      </div>
    </div>
  );
}
