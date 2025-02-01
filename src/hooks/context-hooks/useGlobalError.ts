import { useState } from "react";


export const useGlobalError = () => {

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState<any>(null);

    // Método para activar el modal con el mensaje de error
    const showError = (message: any) => {
        setErrorModalMessage(message);
        setOpenErrorModal(true);
    };

    // Método para cerrar el modal
    const handleCloseModal = () => {
        setOpenErrorModal(false);
    };

    return {
        openErrorModal,
        errorModalMessage,
        showError, // Método para mostrar el error desde cualquier componente
        handleCloseModal
    };

}