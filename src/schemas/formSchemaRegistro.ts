import { z } from "zod";

export const formSchemaCrearRegistro = z.object({
    paciente_id: z.string().min(1,{
        message: "La fecha de nacimiento no puede estar vacía.",
    }),
    fechaDiagnostico: z.string().min(1, {
        message: "La fecha de nacimiento no puede estar vacía.",
    }).refine((fecha) => {
        const fechaISORegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        return fechaISORegex.test(fecha);
    }, {
        message: "Necesario formato ISO (YYYY-MM-DD).",
    }),
    sexo: z.string(),
    edad: z.number().min(0, "La edad debe ser un número positivo").max(200),
    //Aqui comienza
    peso: z.number({ invalid_type_error: "El campo de Peso no puede estar vacío" })
        .min(0, "El peso debe ser un número positivo"),
    estatura: z.number({ invalid_type_error: "El campo de Estatura no puede estar vacío" })
        .min(0, "La estatura debe ser un número positivo"),
    presionArterialPAS_0min: z.number({ invalid_type_error: "El campo de PAS no puede estar vacío" })
        .min(0, "La presión sistólica a 0 min debe ser un número positivo"),
    presionArterialPAD_0min: z.number({ invalid_type_error: "El campo de PAD no puede estar vacío" })
        .min(0, "La presión diastólica a 0 min debe ser un número positivo"),
    presionArterialPAS_5min: z.number({ invalid_type_error: "El campo de PAS no puede estar vacío" })
        .min(0, "La presión sistólica a 5 min debe ser un número positivo"),
    presionArterialPAD_5min: z.number({ invalid_type_error: "El campo de PAD no puede estar vacío" })
        .min(0, "La presión diastólica a 5 min debe ser un número positivo"),
    hba1c: z.number({ invalid_type_error: "El campo de HbA1c no puede estar vacío" }).min(0, "El valor de HbA1c debe ser un número positivo"),
    anioDiagnostico: z.enum(['0', '1','2']),
    antecedFamiInfa: z.enum(['0', '1','2']),
    descripcionAntecedentes: z.string().nullable(),
    hdl: z.number({ invalid_type_error: "El campo de HDL no puede estar vacío" }).min(0, "El HDL debe ser un número positivo"),
    tgc: z.number({ invalid_type_error: "El campo de TGC no puede estar vacío" }).min(0, "El TGC debe ser un número positivo"),
    educacion: z.string().min(0,"La educación es requerida"),
    detalleEducacion: z.string().nullable(),
    estadoCivil: z.string().min(0,"El estado civil es requerido"),
    usaTratamientoInyectable: z.number().min(0).max(1),
    usaTratamientoOral: z.number().min(0).max(1),

    //tratamientos
    //inyectable
    desdeCuandoIn: z.string().nullable(),
    dosisIn: z.string().nullable(),
    tipoNombreIn: z.string().nullable(),

    //oral
    desdeCuandoOr: z.string().nullable(),
    dosisOr: z.string().nullable(),
    nombreMedicamentoOr: z.string().nullable(),
});
