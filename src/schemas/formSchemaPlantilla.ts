import { z } from "zod";

export const formSchemaPlantilla = z.object({
    nombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    }),
    descripcion: z.string().min(1, {
        message: "La Descripcion no puede estar vacío.",
    }), 
    autor: z.string().min(1, {
        message: "El Autor no puede estar vacío.",
    }), 
    adaptacionPor: z.string().min(1, {
        message: "La Adaptación Por no puede estar vacío.",
    })
});
