import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getHotelAccessibility, getRestaurantAccessibility } from "@/pages/api/api_questionnaire";

const disabilityIcons = {
  Visual: "/icons/visual.svg",
  Auditiva: "/icons/auditiva.svg",
  Motriz: "/icons/motriz.svg",
  Intelectual: "/icons/intelectual.svg",
  Neurodivergente: "/icons/neurodivergente.svg",
};

const EstablecimientoModal = ({ isOpen, onClose, establishment, onGetDirections, onImageClick }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [validDisabilities, setValidDisabilities] = useState([]);

  useEffect(() => {
    const fetchAccessibilityData = async () => {
      try {
        console.log("Fetching accessibility data for establishment:", establishment);

        let accessibilityData = [];
        if (establishment?.giro === "HOTEL") {
          console.log("Fetching hotel accessibility data...");
          accessibilityData = await getHotelAccessibility(establishment._id);
        } else if (establishment?.giro === "RESTAURANTE") {
          console.log("Fetching restaurant accessibility data...");
          accessibilityData = await getRestaurantAccessibility(establishment.id);
        }
        
        console.log("Accessibility data received:", accessibilityData);

        // Filter valid disabilities that have questions with true responses
        const filteredDisabilities = accessibilityData.disabilities?.map((disability) => {
          if (
            disability.type === "Visual" || 
            disability.type === "Auditiva" || 
            disability.type === "Motriz" || 
            disability.type === "Intelectual" || 
            disability.type === "Neurodivergente"
          ) {
            console.log(`Checking disability type: ${disability.type}`);
            const hasValidResponse = disability.sections.some((section) =>
              section.questions.some((question) => question.response === true)
            );
            return hasValidResponse ? { type: disability.type, valid: true } : null; // Retorna null si no hay validación
          }
          return null;
        }).filter(disability => disability !== null); // Filtra los nulos
        
        console.log("Filtered disabilities:", filteredDisabilities);
        setValidDisabilities(filteredDisabilities);
      } catch (error) {
        console.error("Error obteniendo accesibilidad:", error);
      }
    };

    if (isOpen && establishment?._id) {
      fetchAccessibilityData();
    }
  }, [isOpen, establishment]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl h-auto rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-start border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#2F4858]">{establishment.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{establishment.address}</p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Galería de imágenes */}
            <div className="space-y-4">
              {establishment.images && establishment.images.length > 0 ? (
                <>
                  <div
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => onImageClick && onImageClick(establishment.id)}
                  >
                    <Image
                      src={establishment.images[activeImage]}
                      alt={`Imagen ${activeImage + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No hay imágenes disponibles.</p>
              )}
            </div>

            {/* Descripción y comentarios */}
            <div className="space-y-6">
              {/* Mostrar rating */}
              <div className="flex items-center gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src="/estrellita.svg"
                    alt="Estrella"
                    className={star <= Math.round(establishment.rating) ? "opacity-100" : "opacity-30"}
                    width={20}
                    height={20}
                  />
                ))}
              </div>

              {/* Descripción */}
              <div>
                <p className="text-gray-600">{establishment.description}</p>
              </div>

              {/* Íconos de discapacidades */}
              <div className="flex flex-wrap gap-4 items-center">
                {validDisabilities.length > 0 ? (
                  validDisabilities.map((disability) => (
                    <div key={disability.type} className="flex flex-col items-center">
                      <Image
                        src={disabilityIcons[disability.type]}
                        alt={disability.type}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                      <span className="text-sm text-gray-600 mt-1">
                        {disability.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No se encontraron discapacidades válidas.</p>
                )}
              </div>

              {/* Botón ¿Cómo llego? */}
              <div>
                <button
                  className="bg-[#8CC63F] text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => {
                    if (onGetDirections) {
                      onGetDirections(establishment);
                    } else {
                      console.error("onGetDirections no está definido.");
                    }
                  }}
                >
                  ¿Cómo llego?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstablecimientoModal;
