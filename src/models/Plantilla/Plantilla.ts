import { SeccionPlantilla } from "./SeccionPlantilla";

export interface Plantilla{
    id: string;
    titulo: string;
    adaptacion: string;
    fechaCreacion: Date;
    ultimaModificacion: Date;
    secciones: SeccionPlantilla[];
}