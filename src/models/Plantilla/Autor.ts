import { Plantilla } from "./Plantilla";

export interface Autor{
    id: string;
    nombre: string;
    plantillas: Plantilla[];
}