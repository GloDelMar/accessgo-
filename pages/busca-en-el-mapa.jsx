import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import MapWithPlaces from "./MapWithPlaces";
import SearchWithGeocoding from "@/components/Organism/SearchWithGeocoding";
import SearchBar from "@/components/Organism/SearchBar";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

mapboxgl.accessToken = "pk.eyJ1IjoiYWNjZXNnbyIsImEiOiJjbTI4NGVjNnowc2RqMmxwdnptcXAwbmhuIn0.0jG0XG0mwx_LHjdJ23Qx4A";

export default function MapContainer() {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedRating, setSelectedRating] = useState("all");
    const [mapInstance, setMapInstance] = useState(null);
    const [selectedDisability, setSelectedDisability] = useState("all");

    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
    };

    return (
        <div className="flex flex-col w-full px-6 h-screen">
            {/* Barra de herramientas superior */}
            <header className="flex flex-wrap items-center justify-between bg-white shadow-md p-4">
                <h1 className="text-xl font-bold">AccessGo</h1>
            </header>

            {/* Filtros y buscador */}
            <div className="p-4 bg-gray-200 flex flex-col sm:flex-row gap-4">
                <SearchWithGeocoding map={mapInstance} />
                <SearchBar

                    handleSearchChange={(e) => setSearchQuery(e.target.value)}
                    selectedType={selectedType}
                    handleTypeChange={(e) => setSelectedType(e.target.value)}
                    selectedRating={selectedRating}
                    handleRatingChange={(e) => setSelectedRating(e.target.value)}
                    selectedDisability={selectedDisability} // Pasar como prop
                    handleDisabilityChange={(e) => setSelectedDisability(e.target.value)} // Pasar como prop
                />
            </div>

            {/* Contenedor principal */}
            <div className="flex flex-grow flex-row">
                {/* Panel lateral para detalles */}
                {selectedPlace && (
                    <aside
                        className={`w-full h-full sm:w-1/3 bg-gray-100 p-4 mb-2 border-l transform ${selectedPlace ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out relative`}
                    >
                        <div className="flex my-2 flex-col items-center w-2/3 bg-[#F5F0E5] h-full p-2 rounded">
                            <Image
                                src={selectedPlace.profilePicture} // URL de la imagen
                                alt="Imagen de perfil o logo de la empresa"
                                width={500}
                                height={300}
                                className="rounded"
                            />
                            <h2 className="text-lg font-bold">{selectedPlace.companyName}</h2>
                            <p className="text-center">{selectedPlace.description}</p>
                        </div>
                        <button
                            className="absolute top-1/2 right-[2px] bg-gray-400 text-gray-700 hover:text-gray-900 p-2 rounded transform -translate-x-1/2 -translate-y-1/2"
                            onClick={() => setSelectedPlace(null)}
                        >
                            <IoIosArrowBack size={24} />
                        </button>
                    </aside>
                )}

                {/* Mapa con lugares */}
                <div className="flex-grow relative">
                    <MapWithPlaces
                        onSelectPlace={handleSelectPlace}
                        setMapInstance={setMapInstance} // Enviar la instancia del mapa
                        searchQuery={searchQuery}
                        selectedType={selectedType}
                        selectebilidRating={selectedRating}
                        selectedDisaty={selectedDisability} // Pasar como prop
                    />
                </div>
            </div>
        </div>
    );
}
