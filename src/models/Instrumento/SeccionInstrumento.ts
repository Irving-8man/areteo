import { PreguntaInstrumento } from "./PreguntaInstrumento";

export interface SeccionInstrumento{
    id: string;
    instrumentoId: string;
    nombre: string;
    valor: number;
    preguntas: PreguntaInstrumento[];
}