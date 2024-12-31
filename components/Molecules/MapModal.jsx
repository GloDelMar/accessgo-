import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-4 max-w-md w-full relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-700 hover:text-black"
      >
        ✖
      </button>
      {children}
    </div>
  </div>
  );
};

export default Modal;
