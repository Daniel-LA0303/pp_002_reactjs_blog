import { ReactNode } from "react";
import { AppContext } from "./AppContext"
import { useGlobalError } from "../hooks/context-hooks/useGlobalError";

interface AppProviderProps {
    children: ReactNode;
  }
  

export const AppProvider = ({children}: AppProviderProps) => {

    // import hooks here
    const {
        showError,
        handleCloseModal,
        openErrorModal,
        errorModalMessage
    } = useGlobalError();

    return (
        <AppContext.Provider 
            value={{
                showError,
                handleCloseModal,
                openErrorModal,
                errorModalMessage
            }}
        >
            {children}
        </AppContext.Provider>
    )
}