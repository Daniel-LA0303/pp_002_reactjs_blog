import React, { useState, useEffect, ReactNode } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalGlobalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  showCloseButton?: boolean;
}

// Mapeo de tamaños a clases de Tailwind
const sizeMap = {
  xs: 'max-w-md',
  sm: 'max-w-lg',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl'
};

const ModalGlobal: React.FC<ModalGlobalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  // Variantes para las animaciones con Framer Motion
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  // Clase de ancho máximo basada en la prop maxWidth
  const maxWidthClass = maxWidth ? sizeMap[maxWidth] : 'max-w-lg';
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          onClick={handleClose} // Cerrar la modal al hacer clic en el fondo
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className={`${widthClass} ${maxWidthClass} mx-auto`}
            onClick={(e) => e.stopPropagation()} // Evitar que el clic en la modal cierre el fondo
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-h-[90vh] outline-none">
              {(title || showCloseButton) && (
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                  {title && (
                    <h2 id="modal-global-title" className="text-lg font-medium text-gray-800">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <button
                      type="button"
                      aria-label="close"
                      onClick={handleClose}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                  )}
                </div>
              )}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalGlobal;