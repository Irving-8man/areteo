import { Link, useLocation } from 'react-router-dom';
import { AccessTimeRegular } from "@fluentui/react-icons";
import { Button } from '@fluentui/react-components';


export default function NavLinks() {
    const location = useLocation()


    const links = [
        { name: 'Inicio', href: `/dashboard`, icon: AccessTimeRegular, },
        { name: 'Analiticas', href: `/dashboard/analiticas`, icon: AccessTimeRegular, },
        { name: 'Pacientes', href: `/dashboard/pacientes`, icon: AccessTimeRegular, },
        { name: 'Instrumentos', href: `/dashboard/instrumentos`, icon: AccessTimeRegular, },
        { name: 'Plantillas', href: `/dashboard/plantillas`, icon: AccessTimeRegular, },
    ];

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Button key={link.name} appearance='transparent' style={{ width: "100%", margin: "0", padding: "0", border: "0", borderRadius: "0" }}>
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`flex w-full h-[48px] items-center justify-start gap-2 text-sm font-medium p-4 
                                ${location.pathname === link.href ? 'bg-stone-200 underline' : 'hover:underline'}`}
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
