import { z } from "zod";

export const formSchemaAdminRegistro = z.object({
    nombreUsuario: z.string().min(3, {
        message: "El Nombre de Usuario debe tener mínimo 3 caracteres",
    }).max(60, {
        message: "El Nombre de Usuario no puede tener más de 60 caracteres",
    }).refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El Nombre de Usuario solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),

    nombreComple: z.string().min(3, {
        message: "El Nombre Completo debe tener mínimo 3 caracteres",
    }).max(60, {
        message: "El Nombre Completo no puede tener más de 60 caracteres",
    }).refine(
        val => /^[\p{L}\p{M}\s.,'-]+$/u.test(val),
        {
            message: "El Nombre Completo solo puede contener letras (incluyendo acentos), espacios, puntos, comas, apóstrofes y guiones",
        }
    ),

    contrasenia: z.string().min(4, {
        message: "La Contraseña debe tener mínimo 4 caracteres",
    }).max(8, {
        message: "La Contraseña debe tener máximo 8 caracteres",
    }),
    confirmContrasenia: z.string().min(4, {
        message: "Debe tener mínimo 4 caracteres",
    }).max(8, {
        message: "Debe tener máximo 8 caracteres",
    }),

}).refine((data) => data.contrasenia === data.confirmContrasenia, {
    message: "Las contraseñas no son iguales.",
    path: ["confirmContrasenia"],
})


export const formSchemaAdminLogin = z.object({
    nombreUsuario: z.string().min(0, {
        message: "Por favor, escriba el Nombre",
    }),
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    }),
})



export const formSchemaActualizarNombres = z.object({
    nombreUsuario: z.string().min(3, {
        message: "El Nombre de Usuario debe tener mínimo 3 caracteres.",
    }).refine(val => !val || /^[\p{L}ÁÉÍÓÚáéíóúÑñÜü]+$/u.test(val), {
        message: "El Nombre de Usuario solo puede contener letras y acentos, sin espacios ni puntuación.",
    }),
    nombreComple: z.string().min(3, {
        message: "El Nombre Completo debe tener mínimo 3 caracteres.",
    })
        .max(60, {
            message: "El Nombre Completo debe tene no puede tener más de 60 caracteres",
        })
        .refine(val => /^[\p{L}\p{M}\s.,'-]+$/u.test(val),
            {
                message: "El nombre solo puede contener letras (incluyendo acentos), espacios, puntos, comas, apóstrofes y guiones",
            }),
});


export const formSchemaActualizarContra = z.object({
    contrasenia: z.string({
        required_error: "Escriba otra vez la nueva contraseña",
        invalid_type_error: "Debe ser una cadena de texto",
    })
    .min(4, {
        message: "La Contraseña debe tener mínimo 4 caracteres.",
    }).max(8, {
        message: "La Contraseña debe tener máximo 8 caracteres",
    }),

    confirmContrasenia:z.string({
        required_error: "Escriba otra vez la nueva contraseña",
        invalid_type_error: "Debe ser una cadena de texto",
    }).min(4, {
        message: "Debe tener mínimo 4 caracteres",
    }).max(8, {
        message: "Debe tener máximo 8 caracteres",
    }),

}).refine((data) => data.contrasenia === data.confirmContrasenia, {
    message: "Las contraseñas no son iguales.",
    path: ["confirmContrasenia"],
})


export const formSchemaComprobarContra = z.object({
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    })
})