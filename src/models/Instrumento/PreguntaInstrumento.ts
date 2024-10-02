import { RespuestaInstrumento } from "./RespuestaInstrumento";

export interface PreguntaInstrumento{
    id: string;
    seccionId: string;
    pregunta: string;
    tipo: string;
    valor: number;
    respuestas: RespuestaInstrumento[];
}