import clsx from 'clsx';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { generarPaginacion } from '@/utils/GenerarPaginacion';
import { ArrowCircleLeft20Regular, ArrowCircleRight20Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useRef, useState } from 'react';
import { paginasPacientes } from '@/services/PacienteController';
import { usePacienteStore } from '@/store/storePacientes';
import { useNavigate } from 'react-router-dom';

export default function Paginacion() {
    const [searchParams] = useSearchParams();
    const [totalPages, setNumPages] = useState<number>(0);
    const pacientes = usePacienteStore((state) => state.pacientes); //Bandera general de los pacientes
    const paginasMomento = useRef<number>(1);

    // Paginación y query
    const currentPage = Number(searchParams.get('page')) || 1;
    const query = searchParams.get('query') || '';
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate(); // Para redirigir

    // Memorizar la función createPageURL para evitar problemas con dependencias
    const createPageURL = useCallback(
        (pageNumber: number | string) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', pageNumber.toString());
            return `${pathname}?${params.toString()}`;
        },
        [searchParams, pathname]
    );

    // Cada vez que cambian los searchParams o pacientes, se ejecuta la búsqueda
    useEffect(() => {
        const fetchData = async () => {
            const pages = await paginasPacientes(query); // Pide a la base de datos
            setNumPages(pages);
        };
        fetchData();
    }, [query, currentPage, pacientes]);

    
    // Mantener una referencia de las páginas actuales
    useEffect(() => {
        paginasMomento.current = totalPages;
    }, [totalPages]);


    // Si la página actual es mayor que el total de páginas y ajustar si es necesario
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            navigate(createPageURL(totalPages));
        }
    }, [currentPage, totalPages, navigate, createPageURL]);

    const allPages = generarPaginacion(currentPage, totalPages);

    return (
        <div className='flex justify-center'>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px ">
                    {allPages.map((page, index) => {
                        let position: 'first' | 'last' | 'single' | 'middle' | undefined;

                        if (index === 0) position = 'first';
                        if (index === allPages.length - 1) position = 'last';
                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"

                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </div>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: 'first' | 'last' | 'middle' | 'single';
    isActive: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center text-sm border',
        {
            'rounded-l-md': position === 'first' || position === 'single',
            'rounded-r-md': position === 'last' || position === 'single',
            'z-10  bg-blue-300 text-black border-black ': isActive,
            'hover:bg-gray-100': !isActive && position !== 'middle',
            'text-gray-300': position === 'middle',
        },
    );

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link to={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
}) {
    const className = clsx(
        'flex h-10 w-10 items-center justify-center rounded-md border',
        {
            'pointer-events-none text-gray-300': isDisabled,
            'hover:bg-gray-100': !isDisabled,
            'mr-2 md:mr-4': direction === 'left',
            'ml-2 md:ml-4': direction === 'right',
        },
    );

    const icon =
        direction === 'left' ? (
            <ArrowCircleLeft20Regular className="w-4" />
        ) : (
            <ArrowCircleRight20Regular className="w-4" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} to={href}>
            {icon}
        </Link>
    );
}
