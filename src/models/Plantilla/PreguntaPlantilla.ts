import { RespuestaPlantilla } from "./RespuestaPlantilla";

export interface PreguntaPlantilla{
    id: string;
    seccionId: string;
    pregunta: string;
    tipo: string;
    respuestas: RespuestaPlantilla[];
}