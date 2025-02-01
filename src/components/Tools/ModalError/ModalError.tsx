import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext } from 'react'
import { ApiResponse } from '../../../types/category';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';

interface ModalErrorProps {
    open: boolean; // Controla si el modal está abierto
    message: ApiResponse<any>; // Recibe el mensaje de error (cualquier tipo)
    onClose: () => void; // Función para cerrar el modal
}

const ModalError: React.FC<ModalErrorProps> = ({ open, message, onClose }) => {

    const navigate = useNavigate();  

    const { resetErrorState } = useContext(AppContext);

    // when the modal is closed, the error state is reset and the user is redirected to the home page
    const handleCloseAndRedirect = () => {
        onClose();  
        navigate('/home-dev');  
        resetErrorState();
    };

    return (
        <Dialog open={open} onClose={handleCloseAndRedirect} className="backdrop-blur-sm">
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="bg-gray-200 w-full px-16 md:px-0  flex items-center justify-center">
                        <div className="bg-white  flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 ">
                            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">{message?.status}</p>
                            <p className="text-2xl md:text-3xl lg:text-2xl font-bold  text-gray-500 mt-4">{message?.message ? message?.message : 'Whoops, something went wrong on our servers.'}</p>
                            <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">{message?.method}</p>
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAndRedirect} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalError;