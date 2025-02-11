import React, { useState, useEffect } from "react";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = "Sí, Confirmar",
  finalTitle = "¿Está seguro?",
  finalMessage = "Presione 'Confirmar' para completar la acción.",
  finalConfirmText = "Confirmar Acción",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  const [isFinalStep, setIsFinalStep] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsFinalStep(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{isFinalStep ? finalTitle : title}</h2>
        <p>{isFinalStep ? finalMessage : message}</p>

        <div className="modal-buttons">
          {!isFinalStep && (
            <>
              <button className="btn-confirm" onClick={() => setIsFinalStep(true)}>
                {confirmText}
              </button>
              <button className="btn-cancel" onClick={onCancel}>
                {cancelText}
              </button>
            </>
          )}

          {isFinalStep && (
            <>
              <button className="btn-confirm" onClick={onConfirm}>
                {finalConfirmText}
              </button>
              <button className="btn-cancel" onClick={onCancel}>
                {cancelText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
