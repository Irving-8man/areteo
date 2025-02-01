import { useEffect, useState } from "react";
import { Admin } from "@/models/types";
import RegistrarAdmin from "./ProcesarAdmin/RegistrarAdmin";
import LoginAdmin from "./ProcesarAdmin/LoginAdmin";
import { AdminRepository } from "@/services/repositorios/AdminRepository";
import { SqliteDatabase } from "@/services/repositorios/DatabaseSingle";

export default function Bienvendida() {
    const [admin, setAdmin] = useState<Admin | null>(null);
    useEffect(() => {
        async function fetchAdmin() {
            const db = await SqliteDatabase.getInstance();
            const adminRepo = new AdminRepository(db);
            adminRepo.getAdmin().then((admin) => {
                if (admin) {
                    setAdmin(admin)
                }
            });
        }

        fetchAdmin()
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

