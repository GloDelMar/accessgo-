import React from "react";

const CustomModal = ({ isOpen, onClose, title, message, buttonText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <button 
          onClick={onClose} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
