import { z } from "zod";

export const formSchemaCrearRegistro = z.object({
    paciente_id: z.string().min(1,{
        message: "La fecha de nacimiento no puede estar vacía.",
    }),
    fechaDiagnostico: z.string(),
    sexo: z.string(),
    edad: z.number().min(0, "La edad debe ser un número positivo").max(200),
    edadDicha: z.string(),
    //Aqui comienza
    peso: z.number({ invalid_type_error: "El campo de Peso no puede estar vacío" })
        .min(0, "El peso debe ser un número positivo").max(
            300,"El peso no puede ser más de 300 kg"
        ),
    estatura: z.number({ invalid_type_error: "El campo de Estatura no puede estar vacío" })
        .min(0, "La estatura debe ser un número positivo").max(
            300,"La estatura no puede ser más de 300 cm"
        ),
    presionArterialPAS_0min: z.number({ invalid_type_error: "El campo de PAS no puede estar vacío" })
        .min(0, "La presión sistólica a 0 min debe ser un número positivo").max(
            999,"La presión sistólica a 0 min no debe ser mayor a 999"
        ),
    presionArterialPAD_0min: z.number({ invalid_type_error: "El campo de PAD no puede estar vacío" })
        .min(0, "La presión diastólica a 0 min debe ser un número positivo").max(
            999,"La presión diastólica a 0 min no debe ser mayor a 999"
        ),
    presionArterialPAS_5min: z.number({ invalid_type_error: "El campo de PAS no puede estar vacío" })
        .min(0, "La presión sistólica a 5 min debe ser un número positivo").max(
            999,"La presión sistólica a 5 min no debe ser mayor a 999"
        ),
    presionArterialPAD_5min: z.number({ invalid_type_error: "El campo de PAD no puede estar vacío" })
        .min(0, "La presión diastólica a 5 min debe ser un número positivo").max(
            999,"La presión diastólica a 5 min no debe ser mayor a 999"
        ),
    hba1c: z.number({ invalid_type_error: "El campo de HbA1c no puede estar vacío" })
    .min(0, "El valor de HbA1c debe ser un número positivo").max(
        99,"El valor de HbA1c no debe ser mayor a 99"
    ),
    anioDiagnostico: z.string().min(1),
    antecedFamiInfa: z.string().min(1),
    descripcionAntecedentes: z.string().nullable(),
    hdl: z.number({ invalid_type_error: "El campo de HDL no puede estar vacío" })
    .min(0, "El HDL debe ser un número positivo").max(
        99,"El valor de HDL no debe ser mayor a 99"
    ),
    tgc: z.number({ invalid_type_error: "El campo de TGC no puede estar vacío" }).min(0, "El TGC debe ser un número positivo")
    .max(
        999,"El valor de TGC no debe ser mayor a 999"
    ),
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
