import { Button } from "@fluentui/react-components";
import NavLinks from "./NavLinks";
import { Link, useLocation } from "react-router-dom";
import { ArrowCounterclockwise20Filled, PersonHome20Filled } from "@fluentui/react-icons";
import { isRutaExacta } from "@/utils/IdentificarRutas";
import GitHubButton from "@/componets/GitHub";

export default function SideNav() {
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
                    <GitHubButton />
                    <Button appearance='outline' className='h-[48px] hover:underline' style={{ width: "100%",borderRight:"0px",  borderRadius:"0px",justifyContent: "flex-start" }} onClick={handleReloadPage} icon={<ArrowCounterclockwise20Filled className="w-3 hover:underline" id="spin" />}>
                        <span>Recargar app</span>
                    </Button>
                    <Button appearance='outline' icon={<PersonHome20Filled />} style={{borderRight:"0px", width: "100%",paddingBlock:"0px", borderRadius:"0px",justifyContent: "flex-start" }} >
                        <Link
                            to="/dashboard/perfil"
                            className={`flex w-full h-[48px] items-center justify-start text-sm font-medium 
                                ${isRutaExacta(pathName, "/dashboard/perfil") ? 'underline text-blue-700' : 'hover:underline'}`}
                        >
                            <p>Mi Perfil</p>
                        </Link>
                    </Button>
                </div>

            </div>
        </aside>
    );
}
