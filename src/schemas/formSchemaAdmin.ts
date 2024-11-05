import { z } from "zod";

export const formSchemaAdminRegistro = z.object({
    nombreComple: z.string().min(3, {
        message: "El Nombre completo debe tener mínimo 3 caracteres.",
    }),
    nombreUsuario: z.string().min(3, {
        message: "El Nombre de usuario debe tener mínimo 3 caracteres.",
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
    nombreComple: z.string().min(0, {
        message:"Por favor, escriba el Nombre completo",
    }),
    nombreUsuario: z.string().min(0, {
        message:"Por favor, escriba el Nombre de usuario",
    }),
    contrasenia: z.string().min(0, {
        message: "Por favor, escriba la Contraseña",
    }),
})


export const formSchemaActualizar = z.object({
    nombreComple: z.string().min(3, { message: "El nombre completo es requerido." }),
    nombreUsuario: z.string().min(3, { message: "El nombre de usuario es requerido." }),
    contrasenia: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});


