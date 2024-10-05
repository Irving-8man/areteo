import { z } from "zod";

export const formSchemaAdminRegistro = z.object({
    nombre: z.string().min(3, {
        message: "El Nombre debe tener mínimo 3 caracteres.",
    }),
    contrasenia: z.string().min(8, {
        message: "La Contraseña debe tener mínimo 8 caracteres.",
    }),
    confirmContrasenia: z.string(),

}).refine((data) => data.contrasenia === data.confirmContrasenia, {
    message: "Las contraseñas no son iguales.",
    path: ["confirmContrasenia"],
})


export const formSchemaAdminLogin = z.object({
    nombre: z.string().min(0, {
        message:"Por favor, escriba el Nombre",
    }),
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    }),
})


