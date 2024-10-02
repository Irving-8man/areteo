import { RespuestaPlantilla } from "../Plantilla/RespuestaPlantilla";

export interface RespuestaInstrumento extends RespuestaPlantilla{
    isCorrected: number;
}