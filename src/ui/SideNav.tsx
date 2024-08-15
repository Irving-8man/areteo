import { Button } from "@fluentui/react-components";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

export default function SideNav() {
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
                <Button appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <Link
                            to="/dashboard/perfil"
                            className="flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4"
                        >
                            <p>Mi Perfil</p>
                        </Link>
                    </Button>
                    <Button appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
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
