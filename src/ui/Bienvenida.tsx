import { getAdmin } from "@/services/AdminController";
import { useEffect, useState } from "react";
import { Admin } from "@/models/types";
import RegistrarAdmin from "./ProcesarAdmin/RegistrarAdmin";
import Login from "./ProcesarAdmin/Login";
import { Link } from "react-router-dom";
import { Button } from "@fluentui/react-components";

export default function Bienvendida() {
    //Reconocer la existencia de un Admin en db
    const [admin, setAdmin] = useState<Admin | null>(null);
    useEffect(() => {
        getAdmin().then((admin) => {
            if (admin) {
                setAdmin(admin);
            } 
        });
    }, []);

    return (
        <main className="min-h-screen flex flex-col justify-start items-center gap-7">
            <div className="py-10">
                <h1 className="text-4xl font-medium">Bienvenido a ARETEO</h1>
            </div>
            {/**Renderizar el componente que sea necesario */}
            { admin ? ( <Login />) : ( <RegistrarAdmin /> )}
            <Link to="/dashboard"><Button appearance="outline">Ir a Dashboard</Button></Link>
        </main>
    )
}

