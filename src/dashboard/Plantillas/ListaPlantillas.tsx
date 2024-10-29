import SearchPlantilla from "@/componets/SearchPlantilla";
import DialogRegiPlantilla from "@/ui/DialogRegiPlantilla";
import TablaPlantillas from "@/ui/TablaPlantillas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearPlantilla, paginasPlantilla } from "@/services/PlantillasController";
import { Plantilla } from "@/models/types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PaginacionPlantillas from "../../ui/PaginacionPlantillas";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePlantillas } from "@/hooks/usePlantillas";

export default function ListaPlantillas() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('queryPlant') || '';
    const currentPage = Number(searchParams.get('pagePlant')) || 1;
    const navigate = useNavigate();
    const location = useLocation();
    const [totalPages, setTotalPages] = useState<number>(0);
    const paginasMomento = useRef<number>(1);
    const {plantillas} = usePlantillas(query,currentPage);


    // Mutación para registrar una plantilla
    const mutation = useMutation({
        mutationFn: crearPlantilla,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["plantillas"] });
            const updatedPages = await paginasPlantilla(query);
            setTotalPages(updatedPages);
            if (updatedPages > totalPages) {
                navigate(createPageURL(updatedPages));
            }
        },
        onError: (error) => {
            console.error("Error al registrar la plantilla:", error);
        },
    });


    const handleCreatePlant = async (data: Plantilla): Promise<boolean> => {
        try {
            await mutation.mutateAsync(data);
            return true;
        } catch (error) {
            console.error("Error durante el registro:", error);
            return false;
        }
    };



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
                <DialogRegiPlantilla onSubmits={handleCreatePlant} />
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
