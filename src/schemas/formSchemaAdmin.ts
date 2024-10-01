import { z } from "zod";

export const formSchemaAdminLogin = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    constrasenia: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})


export const formSchemaAdminRegistro = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    constrasenia: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})