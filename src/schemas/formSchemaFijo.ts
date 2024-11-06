import { z } from "zod";

export const formSchemaFijo = z.object({
    respuestas: z.record(z.string(), z.string().refine(val => {
        const numVal = parseInt(val);
        return numVal >= 0 && numVal <= 11;
    }, {
        message: "La respuesta debe estar entre 0 y 11",
    })),
    nombreEvaluado: z.string()
        .min(1, {
            message: "El nombre de la persona evaluada es obligatorio",
        })
        .max(100, {
            message: "El nombre de la persona evaluada no puede tener más de 60 caracteres",
        })
        .refine(val => /^[a-zA-Z\s.,]+$/.test(val), {
            message: "El nombre solo puede contener letras, espacios, puntos y comas",
        }),
    nombreEvaluador: z.string().max(100).nullable().optional(),
    aplicadoPorAdmin: z.boolean()
});
