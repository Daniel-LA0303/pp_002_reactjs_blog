import { useState } from "react";


export const useGlobalError = () => {

    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState<any>(null);

    // method to show the error
    const showError = (message: any) => {
        setErrorModalMessage(message);
        setOpenErrorModal(true);
    };

    // close the modal
    const handleCloseModal = () => {
        setOpenErrorModal(false);
    };

    const resetErrorState = () => {
        setOpenErrorModal(false);  
        setErrorModalMessage(null); 
    };


    return {
        openErrorModal,
        errorModalMessage,
        showError,
        handleCloseModal,
        resetErrorState
    };

}