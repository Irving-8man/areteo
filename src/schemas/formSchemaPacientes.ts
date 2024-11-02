import { z } from "zod";

export const formSchemaPacienteRegistro = z.object({
    primerNombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    }).refine((nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }),
    segundoNombre: z.string().optional().refine((nombre) => !nombre || /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }), // Opcional
    apellidoPaterno: z.string().min(1, {
        message: "El apellido paterno no puede estar vacío.",
    }).refine((apellido) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido), {
        message: "No debe tener espacios o caracteres extraños.",
    }),
    apellidoMaterno: z.string().optional().refine((apellido) => !apellido || /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido), {
        message: "No debe tener espacios o caracteres extraños.",
    }), // Opcional
    fechaNacimiento: z.string().min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    }).refine((fecha) => {
        const fechaISORegex = /^\d{4}-\d{2}-\d{2}$/;
        return fechaISORegex.test(fecha);
    }, {
        message: "Formato de fecha no válido. Debe ser YYYY-MM-DD.",
    }).refine((fecha) => {
        const fechaNacimiento = new Date(fecha);
        const fechaActual = new Date();
        return fechaNacimiento <= fechaActual;
    }, {
        message: "La fecha de nacimiento no puede ser futura.",
    }),
    sexo: z.string(),
});



export const formSchemaPacienteActua = z.object({
    id: z.string().min(1,{
        message: "La fecha de nacimiento no puede estar vacía.",
    }),
    primerNombre: z.string().min(1, {
        message: "El primer nombre no puede estar vacío.",
    }).refine((nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }),
    segundoNombre: z.string().optional().refine((nombre) => !nombre || /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }), // Opcional
    apellidoPaterno: z.string().min(1, {
        message: "El apellido paterno no puede estar vacío.",
    }).refine((apellido) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido), {
        message: "No debe tener espacios o caracteres extraños.",
    }),
    apellidoMaterno: z.string().optional().refine((apellido) => !apellido || /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido), {
        message: "No debe tener espacios o caracteres extraños.",
    }), // Opcional
    fechaNacimiento: z.string().min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    }).refine((fecha) => {
        const fechaISORegex = /^\d{4}-\d{2}-\d{2}$/;
        return fechaISORegex.test(fecha);
    }, {
        message: "Formato de fecha no válido. Debe ser YYYY-MM-DD.",
    }).refine((fecha) => {
        const fechaNacimiento = new Date(fecha);
        const fechaActual = new Date();
        return fechaNacimiento <= fechaActual;
    }, {
        message: "La fecha de nacimiento no puede ser futura.",
    }),
    sexo: z.string(),
});
