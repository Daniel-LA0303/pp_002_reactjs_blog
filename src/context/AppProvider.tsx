import { ReactNode } from "react";
import { AppContext } from "./AppContext"
import { useGlobalError } from "../hooks/context-hooks/useGlobalError";

interface AppProviderProps {
    children: ReactNode;
  }
  

export const AppProvider = ({children}: AppProviderProps) => {

    // import hooks here

    // hook to manage global error state
    const {
        showError,
        handleCloseModal,
        resetErrorState,
        openErrorModal,
        errorModalMessage
    } = useGlobalError();

    return (
        <AppContext.Provider 
            value={{
                showError,
                handleCloseModal,
                resetErrorState,
                openErrorModal,
                errorModalMessage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}