import { getPlantillasFiltPag } from "@/services/PlantillasController";
import { useQuery } from "@tanstack/react-query";

export const usePlantillas = (query:string, currentPage:number) =>{

    const { data: plantillas = [] }= useQuery(
        {
            queryKey: ['plantillas', query, currentPage],
            queryFn: () => getPlantillasFiltPag(query, currentPage),
        }
    )


    return { plantillas }
}