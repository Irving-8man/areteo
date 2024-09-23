import { Link } from "react-router-dom";
import { Input, Card, CardFooter, Button, InfoLabel } from "@fluentui/react-components";
import { getAdmin } from "../services/db";
import { useEffect, useState } from "react";
import { Admin } from '../models/Admin'; // Importar la interfaz de Admin

export default function Login() {
    // Estado tipado con la interfaz Admin
    const [admin, setAdmin] = useState<Admin | null>(null);


    // useEffect para obtener los datos cuando el componente se monta
    useEffect(() => {
        getAdmin().then((admin) => {
            if (admin) {
                setAdmin(admin); // Guardar el administrador en el estado
                console.log("Administrador encontrado:", admin);
            } else {
                console.log("No se encontró ningún administrador.");
            }
        });
    }, []);

    return (
        <main className="min-h-screen flex flex-col justify-start items-center gap-7">
            <div className="py-10">
                <h1 className="text-4xl font-medium">Bienvenido a ARETEO</h1>
            </div>

            {/* Mostrar mensaje de recuperación de la base de datos */}
            {admin ? (
                <div className="p-5 bg-green-100 rounded-md shadow-md">
                    <p className="text-xl font-bold">Recuperado de la base de datos:</p>
                    <p>Nombre: {admin.nombre}</p>
                    <p>Contra: {admin.contrasena}</p> {/* Asegúrate de que los campos existen */}
                </div>
            ) : (
                <p className="text-red-500">Cargando datos...</p>
            )}

            <Card style={{ padding: "40px" }}>
                <div>
                    <p className="text-center font-bold text-[20px] pb-[30px]">Iniciar sesión</p>
                </div>
                <div className="flex flex-col items-center gap-[25px]">
                    <div className="flex-col">
                        <InfoLabel className="block">Usuario</InfoLabel>
                        <Input appearance="underline" />
                    </div>
                    <div>
                        <InfoLabel className="block">Contraseña</InfoLabel>
                        <Input appearance="underline" type="password" />
                    </div>
                </div>
                <CardFooter className="mt-[30px]">
                    <Button appearance="primary">Acceder</Button>
                    <Link to="/dashboard"><Button appearance="outline">Ir a Dashboard</Button></Link>
                </CardFooter>
            </Card>
        </main>
    )
}