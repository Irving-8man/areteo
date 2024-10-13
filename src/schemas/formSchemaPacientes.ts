import { z } from "zod";

export const formSchemaPacienteRegistro = z.object({
    primerNombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    }),
    segundoNombre: z.string().optional(), // Opcional
    apellidoPaterno: z.string().min(1, {
        message: "El apellido paterno no puede estar vacío.",
    }),
    apellidoMaterno: z.string().optional(), // Opcional
    fechaNacimiento: z.string().min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    }).refine((fecha) => {
        // Validar si la fecha está en formato ISO
        const fechaISORegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        return fechaISORegex.test(fecha);
    }, {
        message: "Necesario formato ISO (YYYY-MM-DD).",
    }),
});
