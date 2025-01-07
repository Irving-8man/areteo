import { Link, useLocation } from 'react-router-dom';
import {  DataArea24Filled, Home24Regular, PeopleCommunity24Regular, TextBulletListSquareEdit24Regular } from "@fluentui/react-icons";
import { Button } from '@fluentui/react-components';
import { isRutaActiva } from '@/utils/IdentificarRutas';


const links = [
    { name: 'Inicio', href: `/dashboard`, icon: Home24Regular },
    { name: 'Pacientes', href: `/dashboard/pacientes`, icon: PeopleCommunity24Regular },
    { name: 'Instrumentos', href: `/dashboard/instrumentos`, icon: TextBulletListSquareEdit24Regular },
    { name: 'Analíticas', href: `/dashboard/analiticas`, icon: DataArea24Filled }
];


export default function NavLinks() {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = isRutaActiva(pathName, link.href);

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
