import { Button } from "@fluentui/react-components";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import { useSesion } from "@/hooks/useSesion";
import { ArrowCounterclockwise20Filled, PersonHome20Filled } from "@fluentui/react-icons";
import { isRutaExacta } from "@/utils/IdentificarRutas";

export default function SideNav() {
    const { logout } = useSesion();
    const location = useLocation();
    const pathName = location.pathname;

    const handleReloadPage = () => {
        const icon = document.getElementById("spin");
        if (icon) {
            icon.classList.add("animate-spin");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            window.location.reload();
        }
    };

    return (
        <aside className="flex h-full flex-col border-e border-e-gray-200">
            {/**Cabecera */}
            <div className="flex flex-row items-end justify-center -bg--color-3 p-4">
                <h1 className="w-32 text-xl uppercase font-semibold text-white">
                    areteo
                </h1>
            </div>

            {/**Secciones */}
            <div className="flex grow justify-between flex-col space-x-0 space-y-2">

                <div className="h-auto w-full grow  block">
                    <NavLinks />
                </div>

                <div>
                    <Button appearance='transparent' style={{ width: "100%", justifyContent: "flex-start" }} onClick={handleReloadPage} icon={<ArrowCounterclockwise20Filled className="w-3 hover:underline" id="spin" />}>
                        <span>Recargar app</span>
                    </Button>
                    <Button appearance='transparent' icon={<PersonHome20Filled />} style={{ width: "100%", justifyContent: "flex-start" }} >
                        <Link
                            to="/dashboard/perfil"
                            className={`flex w-full h-[48px] items-center justify-start text-sm font-medium 
                                ${isRutaExacta(pathName, "/dashboard/perfil") ? 'underline text-blue-700' : 'hover:underline'}`}
                        >
                            <p>Mi Perfil</p>
                        </Link>
                    </Button>
                    <Button onClick={logout} appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <div
                            className="flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4"
                        >
                            <p className="text-red-600 hover:underline">Cerrar Sesión</p>
                        </div>
                    </Button>
                </div>

            </div>
        </aside>
    );
}
