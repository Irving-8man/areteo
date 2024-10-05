import { createContext, ReactNode, useState } from 'react';
import { verificarAdmin } from '../services/AdminController'; // Asegúrate de que esta importación esté activa
import { useNavigate } from 'react-router-dom';
import { Admin, AdminRegistrado } from '@/models/types';

export type Sesion = {
    isAutenticado: boolean;
    login: (data:Admin) => Promise<boolean>;
    logout: () => void;
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

    const login = async (data:Admin):Promise<boolean> => {
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

    return (
        <SesionContext.Provider value={{ isAutenticado, login, logout, dataPrueba, isAdmin }}>
            {children}
        </SesionContext.Provider>
    );
}
