import { useSearchParams, useLocation } from 'react-router-dom';
import { generarPaginacion } from '@/utils/GenerarPaginacion';
import { useCallback, useEffect, useRef, useState } from 'react';
//import { paginasPacientes } from '@/services/PacienteController';
import { usePacienteStore } from '@/store/storePacientes';
import { useNavigate } from 'react-router-dom';
import { PaginationArrow, PaginationNumber } from './ButtonsPagination';
import { SqliteDatabase } from '@/services/repositorios/DatabaseSingle';
import { PacienteRepository } from '@/services/repositorios/PacienteRepository';

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
            const db = await SqliteDatabase.getInstance();
            const pacienteRepo = new PacienteRepository(db);
            const pages = await pacienteRepo.paginasPacientes(query); // Pide a la base de datos
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

