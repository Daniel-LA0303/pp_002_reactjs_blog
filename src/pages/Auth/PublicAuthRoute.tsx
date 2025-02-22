import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Componente para redirigir a los usuarios autenticados fuera de las rutas públicas
const PublicAuthRoute: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicAuthRoute;
