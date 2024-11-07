import { z } from "zod";

export const formSchemaAdminRegistro = z.object({
    nombreComple: z.string().min(3, {
        message: "El Nombre completo debe tener mínimo 3 caracteres.",
    })
    .max(60, {
        message: "El Nombre completo debe tene no puede tener más de 60 caracteres",
    })
    .refine(
        val => /^[\p{L}\s.,]+$/u.test(val), 
        {
            message: "El nombre solo puede contener letras (incluyendo acentos), espacios, puntos y comas",
        }
    ),

    nombreUsuario: z.string().min(3, {
        message: "El Nombre de usuario debe tener mínimo 3 caracteres.",
    }).refine((nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }),

    contrasenia: z.string().min(4, {
        message: "La Contraseña debe tener mínimo 4 caracteres.",
    }).max(8, {
        message: "La Contraseña debe tener máximo 8 caracteres",
    }),
    confirmContrasenia: z.string(),

}).refine((data) => data.contrasenia === data.confirmContrasenia, {
    message: "Las contraseñas no son iguales.",
    path: ["confirmContrasenia"],
})


export const formSchemaAdminLogin = z.object({
    nombreUsuario: z.string().min(0, {
        message:"Por favor, escriba el Nombre",
    }),
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    }),
})



export const formSchemaActualizarNombres = z.object({
    nombreComple: z.string().min(3, {
        message: "El Nombre completo debe tener mínimo 3 caracteres.",
    })
    .max(60, {
        message: "El Nombre completo debe tene no puede tener más de 60 caracteres",
    })
    .refine(val => /^[a-zA-Z\s.,]+$/.test(val), {
        message: "El nombre solo puede contener letras, espacios, puntos y comas",
    }),

    nombreUsuario: z.string().min(3, {
        message: "El Nombre de usuario debe tener mínimo 3 caracteres.",
    }).refine((nombre) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre), {
        message: "No debe tener espacios o caracteres extraños.",
    }),

});


export const formSchemaActualizarContra = z.object({
    contrasenia: z.string().min(4, {
        message: "La Contraseña debe tener mínimo 4 caracteres.",
    }).max(8, {
        message: "La Contraseña debe tener máximo 8 caracteres",
    }),
    confirmContrasenia: z.string(),

}).refine((data) => data.contrasenia === data.confirmContrasenia, {
    message: "Las contraseñas no son iguales.",
    path: ["confirmContrasenia"],
})


export const formSchemaComprobarContra = z.object({
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    })
})