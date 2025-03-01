import React, { useState } from "react";
import "./Modal.css"; // Asegúrate de importar el archivo CSS

interface ModalProps{
    message: string;
    status: string;
    onClose: () => void;
}

const ModalError: React.FC<ModalProps> = ({message, status, onClose}) => {
  const [isOpen, setIsOpen] = useState(true);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        onClose();
    }
  return (
    <div>

      {/* Modal */}
      <div className={`modal ${isOpen ? "modal--visible" : ""}`}>
        <div className="modal__content">
          <h1 className="status">{status}</h1>
          <p className="message">{message}</p>

          <button className="modal__close" onClick={toggleModal}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
