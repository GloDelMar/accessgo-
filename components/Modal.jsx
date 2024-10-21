import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <>
      {/* Overlay oscuro detrás del modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Contenedor del modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
          {/* Contenido dinámico que pasamos como `children` */}
          {children}

          {/* Botón para cerrar el modal */}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#2F4F4F] text-white rounded-md hover:bg-[#004D40]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
