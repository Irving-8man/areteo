import { getAdmin } from "@/services/AdminController";
import { useEffect, useState } from "react";
import { Admin } from "@/models/types";
import RegistrarAdmin from "./ProcesarAdmin/RegistrarAdmin";
import LoginAdmin from "./ProcesarAdmin/LoginAdmin";


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
            <section className="min-h-[60vh] grid place-content-center">
                {/**Renderizar el componente que sea necesario */}
                {admin ? (<LoginAdmin />) : (<RegistrarAdmin />)}
            </section>

        </main>
    )
}

