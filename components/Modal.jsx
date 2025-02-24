import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <>
      {/* Overlay oscuro detrás del modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Contenedor del modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white items-center rounded-lg shadow-lg w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px]  flex flex-col p-6">
          {/* Contenido dinámico */}
          <div className="flex-grow">{children}</div>
      
        </div>
      </div>
    </>
  );
};

export default Modal;
