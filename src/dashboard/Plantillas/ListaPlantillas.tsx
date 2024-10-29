import SearchPlantilla from "@/componets/SearchPlantilla";
import TablaPlantillas from "@/ui/TablaPlantillas";
import {paginasPlantilla } from "@/services/PlantillasController";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PaginacionPlantillas from "../../ui/PaginacionPlantillas";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePlantillas } from "@/hooks/usePlantillas";
import { Button } from "@fluentui/react-components";

export default function ListaPlantillas() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('queryPlant') || '';
    const currentPage = Number(searchParams.get('pagePlant')) || 1;
    const navigate = useNavigate();
    const location = useLocation();
    const [totalPages, setTotalPages] = useState<number>(0);
    const paginasMomento = useRef<number>(1);
    const {plantillas} = usePlantillas(query,currentPage);

    useEffect(() => {
        const fetchTotalPages = async () => {
            const pages = await paginasPlantilla(query);
            setTotalPages(pages);
        };
        fetchTotalPages();
    }, [query, currentPage, plantillas]);


    const createPageURL = useCallback(
        (pageNumber: number | string) => {
            const params = new URLSearchParams(searchParams);
            params.set('pagePlant', pageNumber.toString());
            return `${location.pathname}?${params.toString()}`;
        },
        [searchParams, location.pathname]
    );

    useEffect(() => {
        paginasMomento.current = totalPages;
        if (currentPage > totalPages && totalPages > 0) {
            navigate(createPageURL(totalPages));
        }
    }, [currentPage, totalPages, navigate, createPageURL]);


    return (
        <div>
            <div className="flex gap-2">
                <SearchPlantilla placeholder="Buscar Plantilla..." />
                <Link to="/dashboard/plantillas/crear-plantilla"><Button>Crear Plantilla</Button></Link>
            </div>
            <div>
                <TablaPlantillas plantillasCarga={plantillas} />
                <div>
                    <PaginacionPlantillas totalPages={totalPages}
                        currentPage={currentPage}
                        createPageURL={createPageURL} />
                </div>
            </div>
        </div>
    )
}
