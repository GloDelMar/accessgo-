import React, { useState, useEffect } from "react";
import Image from "next/image";


const disabilityIcons = {
  visual: "/iconsBlue/icons8-acceso-para-ciegos-50.png",
  auditiva: "/iconsBlue/sordera.png",
  motriz: "/iconsBlue/discapacidad.png",
  intelectual: "/iconsBlue/icons8-cabeza-con-cerebro-50.png",
  neurodivergente: "/iconsBlue/icons8-infinito-64.png",
};

const EstablecimientoModal = ({ isOpen, onClose, establishment, onGetDirections, onImageClick }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-start border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#2F4858]">{establishment.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{establishment.address}</p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Cerrar modal"
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
                <div
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => onImageClick && onImageClick(establishment.id)}
                >
                  <Image
                    src={establishment.images[activeImage]}
                    alt={`Imagen ${activeImage + 1} del establecimiento ${establishment.name}`}
                    fill
                    className="object-contain"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                </div>
              ) : (
                <p className="text-gray-500">No hay imágenes disponibles.</p>
              )}
            </div>

            {/* Descripción y comentarios */}
            <div className="space-y-6">
              {/* Mostrar rating */}
              <h3>Calificación:</h3>
              <div className="flex items-center gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src="/estrellita.svg"
                    alt={`${star} estrellas`}
                    className={star <= Math.round(establishment.rating) ? "opacity-100" : "opacity-30"}
                    width={20}
                    height={20}
                  />
                ))}
              </div>

              {/* Descripción */}
              <div>
                <h3>Descripción:</h3>
                <p className="text-gray-600">{establishment.description}</p>
              </div>

              {/* Íconos de discapacidades */}
              <div>
                <h3>Accesibles para:</h3>
                <div className="flex flex-wrap mt-1 gap-4 items-center">

                  {establishment.disabilities.length > 0 ? (
                    establishment.disabilities.map((disability) => (
                      <div key={disability} className="flex flex-col items-center">
                        <Image
                          src={disabilityIcons[disability.toLowerCase()]}
                          alt={`Icono de ${disability}`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <span className="text-sm text-gray-600 mt-1">{disability}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No cuenta con datos de accesibilidad.</p>
                  )}
                </div>
              </div>
              {/* Botón ¿Cómo llego? */}
              <div>
                <button
                  className="bg-[#8CC63F] text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => onGetDirections?.(establishment)}
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
