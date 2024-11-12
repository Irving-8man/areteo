import { z } from "zod";

export const formSchemaPacienteRegistro = z.object({
    primerNombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    })  .refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    segundoNombre: z.string().nullable().optional()  .refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }), // Opcional
    apellidoPaterno: z.string().min(1, {
        message: "El apellido paterno no puede estar vacío.",
    }).refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    apellidoMaterno: z.string().nullable().optional().refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
            message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
        }),
    fechaNacimiento: z.string()
        .min(1, {
            message: "La fecha de nacimiento no puede estar vacía.",
        })
        .refine((fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha), {
            message: "Formato de fecha no válido. Debe ser YYYY-MM-DD.",
        })
        .refine((fecha) => {
            const fechaNacimiento = new Date(fecha);
            const fechaActual = new Date();
            const minDate = new Date('1890-01-01');
            return (
                fechaNacimiento >= minDate && fechaNacimiento <= fechaActual
            );
        }, {
            message: "La fecha de nacimiento debe estar entre 1900 y la fecha actual.",
        }),
    sexo: z.string(),
});



export const formSchemaPacienteActua = z.object({
    id: z.string().min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    }),
    primerNombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    })  .refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    segundoNombre: z.string().nullable().optional()  .refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }), // Opcional
    apellidoPaterno: z.string().min(1, {
        message: "El apellido paterno no puede estar vacío.",
    }).refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    apellidoMaterno: z.string().nullable().optional().refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
            message: "El apellido materno solo puede contener letras y acentos, sin espacios ni puntuación.",
        }),
    fechaNacimiento: z.string()
    .min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    })
    .refine((fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha), {
        message: "Formato de fecha no válido. Debe ser YYYY-MM-DD.",
    })
    .refine((fecha) => {
        const fechaNacimiento = new Date(fecha);
        const fechaActual = new Date();
        const minDate = new Date('1890-01-01');
        return (
            fechaNacimiento >= minDate && fechaNacimiento <= fechaActual
        );
    }, {
        message: "La fecha de nacimiento debe estar entre 1900 y la fecha actual.",
    }),
    sexo: z.string(),
});
