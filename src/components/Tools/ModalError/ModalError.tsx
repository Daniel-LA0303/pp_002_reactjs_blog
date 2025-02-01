import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect } from 'react'

interface ModalErrorProps {
    open: boolean; // Controla si el modal está abierto
    message: any; // Recibe el mensaje de error (cualquier tipo)
    onClose: () => void; // Función para cerrar el modal
}

const ModalError: React.FC<ModalErrorProps> = ({ open, message, onClose }) => {
    const renderMessage = () => {
        // Si el mensaje es un objeto, podemos convertirlo a JSON o extraer un campo específico
        if (typeof message === 'object' && message !== null) {
            return JSON.stringify(message, null, 2); // Si es un objeto, convertirlo a formato JSON
        }
        return message || 'Ocurrió un error inesperado'; // Si es un string o cualquier otro tipo, mostrarlo tal cual
    };

    useEffect(() => {

        console.log('Error:', message);

    }, [message]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="alert-dialog-title">Error</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {renderMessage()} {/* Mostrar el mensaje de error */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalError;