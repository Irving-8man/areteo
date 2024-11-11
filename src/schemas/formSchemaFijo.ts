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
        .max(60, {
            message: "El nombre de la persona evaluada no puede tener más de 60 caracteres",
        })
        .refine(
            val => /^[\p{L}\s.,]+$/u.test(val), 
            {
                message: "El nombre solo puede contener letras (incluyendo acentos), espacios, puntos y comas",
            }
        ),
    nombreEvaluador: z.string().max(60).nullable().optional().refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    aplicadoPorAdmin: z.boolean()
});
