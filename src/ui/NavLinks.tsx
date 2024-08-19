import { Link, useLocation } from 'react-router-dom';
import { AccessTimeRegular } from "@fluentui/react-icons";
import { Button } from '@fluentui/react-components';

export default function NavLinks() {
    const location = useLocation();
    const pathName = location.pathname;

    const normalizedPathName =
        pathName.length > 1 && pathName.endsWith("/")
            ? pathName.slice(0, -1)
            : pathName;

    const links = [
        { name: 'Inicio', href: `/dashboard`, icon: AccessTimeRegular },
        { name: 'Pacientes', href: `/dashboard/pacientes`, icon: AccessTimeRegular },
        { name: 'Instrumentos', href: `/dashboard/instrumentos`, icon: AccessTimeRegular },
        { name: 'Plantillas', href: `/dashboard/plantillas`, icon: AccessTimeRegular },
        { name: 'Analiticas', href: `/dashboard/analiticas`, icon: AccessTimeRegular },
        { name: 'Almacenamiento', href: `/dashboard/almacenamiento`, icon: AccessTimeRegular },
    ];

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = 
                    // Verificar si es exactamente la ruta del enlace
                    normalizedPathName === link.href ||
                    // Si no es el dashboard principal, verifica si es una subruta de la misma
                    (link.href !== '/dashboard' && normalizedPathName.startsWith(link.href + '/'));

                return (
                    <Button key={link.name} appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <Link
                            to={link.href}
                            className={`flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4 
                                ${isActive ? 'bg-stone-200 underline' : 'hover:underline'}`}
                        >
                            <LinkIcon />
                            <p className="block">{link.name}</p>
                        </Link>
                    </Button>
                );
            })}
        </>
    );
}
