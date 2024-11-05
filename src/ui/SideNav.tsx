import { Button } from "@fluentui/react-components";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import { useSesion } from "@/hooks/useSesion";
import { ArrowCounterclockwise20Filled} from "@fluentui/react-icons";

export default function SideNav() {
    const {logout}= useSesion();
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
                    <Button appearance='transparent' style={{ width: "100%",justifyContent:"flex-start" }} onClick={handleReloadPage} icon={<ArrowCounterclockwise20Filled className="w-3" id="spin" />}>
                        Recargar aplicación
                    </Button>
                    <Button appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <Link
                            to="/dashboard/actualizar"
                            className="flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4"
                        >
                            <p>Mi Perfil</p>
                        </Link>
                    </Button>
                    <Button onClick={logout} appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <Link
                            to="/dashboard/perfil"
                            className="flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4"
                        >
                            <p>Cerrar Sesión</p>
                        </Link>
                    </Button>
                </div>

            </div>
        </aside>
    );
}
