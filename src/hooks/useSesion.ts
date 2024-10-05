import { Sesion, SesionContext} from "@/context/SesionContext";
import { useContext } from "react";

export function useSesion(): Sesion {
    const context = useContext(SesionContext);
    if (!context) {
        throw new Error("useSesion debe ser usado dentro de un SesionProvider");
    }
    return context;
}
