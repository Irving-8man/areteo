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
    edad: z.number()
        .min(0, "La edad debe ser un número positivo").max(200),
    peso: z.number()
        .min(0, "El peso debe ser un número positivo"),
    estatura: z.number()
        .min(0, "La estatura debe ser un número positivo"),
    presionArterialPAS_0min: z.number()
        .min(0, "La presión sistólica a 0 min debe ser un número positivo"),
    presionArterialPAD_0min: z.number()
        .min(0, "La presión diastólica a 0 min debe ser un número positivo"),
    presionArterialPAS_5min: z.number()
        .min(0, "La presión sistólica a 5 min debe ser un número positivo"),
    presionArterialPAD_5min: z.number()
        .min(0, "La presión diastólica a 5 min debe ser un número positivo"),
    hba1c: z.number()
        .min(0, "El valor de HbA1c debe ser un número positivo"),
    anioDiagnostico: z.string().min(0,"El año del diagnóstico es requerido"),
    antecedFamiInfa: z.string().min(0,"Los antecedentes familiares son requeridos"),
    descripcionAntecedentes: z.string().nullable(),
    hdl: z.number()
        .min(0, "El HDL debe ser un número positivo"),
    tgc: z.number()
        .min(0, "El TGC debe ser un número positivo"),
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
    nombreMedicamentoIn: z.string().nullable(),
});
