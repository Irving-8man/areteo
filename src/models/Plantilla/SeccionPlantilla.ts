import { PreguntaPlantilla } from "./PreguntaPlantilla";

export interface SeccionPlantilla{
    id: string;
    plantillaId: string;
    nombre: string;
    preguntas: PreguntaPlantilla[];
}