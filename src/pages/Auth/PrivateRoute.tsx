import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Función para verificar si el token es válido (puedes personalizarla)
const isTokenValid = (token: string | null): boolean => {
  return !!token; // Retorna `true` si el token existe, `false` si no
};

// Componente de Ruta Protegida
const PrivateRoute: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return isTokenValid(accessToken) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

