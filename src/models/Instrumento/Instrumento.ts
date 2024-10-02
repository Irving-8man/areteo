import { SeccionInstrumento } from "./SeccionInstrumento";

export interface Instrumento{
    id: string;
    plantillaId: string;
    titulo: string;
    secciones: SeccionInstrumento[];
}