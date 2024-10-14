import { useSesion } from '@/hooks/useSesion';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

//Protección del dashboard y otras rutas
const RutaProtegida: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAutenticado } = useSesion();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAutenticado) {
            navigate("/");
        }
    }, [isAutenticado, navigate]);

    // Si el usuario está autenticado, renderizar el contenido
    return isAutenticado ? <>{children}</> : null;
};

export default RutaProtegida;
