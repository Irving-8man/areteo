import { createContext, ReactNode, useState } from 'react';
import { actualizarAdminNombres, verificarAdmin } from '../services/AdminController';
import { useNavigate } from 'react-router-dom';
import { AdminLogin, AdminRegistrado } from '@/models/types';

export type Sesion = {
    isAutenticado: boolean;
    login: (data: AdminLogin) => Promise<boolean>;
    logout: () => void;
    actualizarNombres: (nuevoNomusuario: string, nuevoNomCom: string) => Promise<boolean>;
    cambiarContrasena: (nuevaContra: string) => Promise<void>;
    dataPrueba: number;
    isAdmin: AdminRegistrado | null;
};

// El contexto de sesión
export const SesionContext = createContext<Sesion | undefined>(undefined);

// Proveer el contexto, lo que ofrece la lógica
export function SesionProvider({ children }: { children: ReactNode }) {
    const [isAutenticado, setIsAutenticado] = useState<boolean>(false);
    const [isAdmin, setAdmin] = useState<AdminRegistrado | null>(null);
    const navigate = useNavigate();
    const dataPrueba = 100;

    const login = async (data: AdminLogin): Promise<boolean> => {
        try {
            const admin = await verificarAdmin(data);
            if (admin) {
                setIsAutenticado(true);
                setAdmin(admin);
                navigate('/dashboard');
                return true;
            } else {
                alert('Nombre de usuario o contraseña incorrecta');
                return false;
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            alert('Hubo un problema al iniciar sesión');
            return false;
        }
    };

    const logout = () => {
        setIsAutenticado(false);
        setAdmin(null);
        navigate('/'); // Redirigir a la ruta de login
    };

    // Función para actualizar solo el nombre completo
    const actualizarNombres = async (nuevoNomusuario: string, nuevoNomCom: string) => {
        if (isAdmin) {
            const res = await actualizarAdminNombres(nuevoNomusuario, nuevoNomCom, isAdmin.id)
            if (res) {
                setAdmin({ 
                    ...isAdmin, 
                    nombreUsuario: nuevoNomusuario, 
                    nombreComple: nuevoNomCom 
                });
            }
            return res
        }else{
            return false
        }
    };

    // Función para cambiar la contraseña
    const cambiarContrasena = async (nuevaContra: string) => {
        if (isAdmin) {
            console.log(nuevaContra)
        }
    };

    return (
        <SesionContext.Provider value={{
            isAutenticado,
            login,
            logout,
            actualizarNombres,
            cambiarContrasena,
            dataPrueba,
            isAdmin
        }}>
            {children}
        </SesionContext.Provider>
    );
}
