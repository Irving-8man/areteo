import { Button, Field, Label, Select, Textarea, Input, InfoLabel } from "@fluentui/react-components"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaCrearRegistro } from "@/schemas/formSchemaRegistro";
import { useEffect, useState } from "react";
import { PacienteRegistrado } from "@/models/types";
import { getPaciente } from "@/services/PacienteController";
import { calcularEdad } from "@/utils/CalcularEdad";
import { format } from "@formkit/tempo";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { crearRegistrosPaciente } from "@/services/RegistrosMedicoController";
import { useNavigate } from 'react-router-dom';

const NIVEL_ESTUDIO = [
    {
        value: 0,
        estudio: "Sin estudio"
    },
    {
        value: 1,
        estudio: "Primaria"
    },
    {
        value: 2,
        estudio: "Secundaria"
    },
    {
        value: 3,
        estudio: "Preparatoria"
    },
    {
        value: 4,
        estudio: "Licenciatura"
    },
    {
        value: 5,
        estudio: "Otro"
    },
];

const educacionMapping: { [key: string]: string } = {
    0: "Sin estudio",
    1: "Primaria",
    2: "Secundaria",
    3: "Preparatoria",
    4: "Licenciatura",
    5: "Otro"
};


const ESTADO_CIVIL = [
    {
        value: 0,
        estado: "Soltero"
    },
    {
        value: 1,
        estado: "Casado"
    },
    {
        value: 2,
        estado: "Unión libre"
    },
    {
        value: 3,
        estado: "Divorciado/ separado"
    },
    {
        value: 4,
        estado: "Viudo"
    },
];


const estadoCivilMapping: { [key: string]: string }  = {
    0: "Soltero",
    1: "Casado",
    2: "Unión libre",
    3: "Divorciado/ separado",
    4: "Viudo"
}

const antecedentesMapping:{ [key: string]: string }  = {
    0: "No",
    1: "Sí",
    2: "Desconozco"
};

const diagnosticoMapping:{ [key: string]: string }  = {
    0: "0 a 5 años",
    1: "6 a 10 años",
    2: "Más de 10 años",
};



//Constantes
const FECHA_HOY = format(new Date(), "YYYY-MM-DD")

export default function CrearRegistro() {
    const { id } = useParams()
    const [parent] = useAutoAnimate()
    const [paciente, setPaciente] = useState<null | PacienteRegistrado>(null)
    const [edad, setEdad] = useState<number>(0)
    const [sexo, setSexo] = useState<string>("Masculino")
    const navigate = useNavigate();

    //Recuperar al paciente
    useEffect(() => {
        const fetchData = async () => {
            const unico = 0
            try {
                const res = await getPaciente(String(id))
                if (res) {
                    setPaciente(res[unico])
                    setEdad(calcularEdad(res[unico].fechaNacimiento).valor);
                    setSexo(res[unico].sexo)
                }
            } catch (error) {
                console.error("Error al consultar la base de datos:", error);
            }
        };
        fetchData();
    }, [id, setEdad]);


    //hooks form
    // useForm con validacion de zod
    const Schema = formSchemaCrearRegistro
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            paciente_id: id,
            fechaDiagnostico: FECHA_HOY,
            sexo: "",
            edad: 0,
            anioDiagnostico: "0",
            antecedFamiInfa: "0",
            descripcionAntecedentes: "",
            educacion: "0",
            detalleEducacion: "",
            estadoCivil: "0",
            usaTratamientoInyectable: 0,
            usaTratamientoOral: 0,
            //tratamientos
            //inyectable
            desdeCuandoIn: "",
            dosisIn: "",
            tipoNombreIn: "",
            //oral
            desdeCuandoOr: "",
            dosisOr: "",
            nombreMedicamentoOr: "",
        },
    });


    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const textoDiagnostico = diagnosticoMapping[data.anioDiagnostico];
        const textoAntecedentes = antecedentesMapping[data.antecedFamiInfa];
        const textoEducacion = educacionMapping[data.educacion];
        const textEstadoCivil = estadoCivilMapping[data.estadoCivil];


        //Ajustes
        data.edad = edad;
        data.sexo = sexo;
        data.anioDiagnostico = textoDiagnostico;
        data.antecedFamiInfa = textoAntecedentes;
        data.educacion = textoEducacion;
        data.estadoCivil = textEstadoCivil;
        console.log(data)
        try {
            const registrado = await crearRegistrosPaciente(data);
            if (registrado) {
                console.log("conseguido")
            } else {
                console.log("no conseguido")
            }
            reset();
            navigate(`/dashboard/pacientes/${id}`);
        } catch (error) {
            console.log("Error durante el registro:", error);
        } finally {
            console.log("finalizado")
        }
    };


    //Observemos los cambios en los inputs opcionales
    const watchShowAnte = watch("antecedFamiInfa", "0")
    const watchShowEdu = watch("educacion", "0");
    const watchShowIny = watch("usaTratamientoInyectable", 0)
    const watchShowOr = watch("usaTratamientoOral", 0)



    return (
        <div>
            <section className="flex justify-between">
                <Link to={`/dashboard/pacientes/${String(id)}`}><Button icon={<ArrowLeft20Filled />}>Volver</Button></Link>
            </section>

            <section className="w-full pl-10 flex flex-row justify-between items-center mt-10">
                <p className="text-left text-xl">{paciente?.primerNombre}</p>
                <p className="text-right text-xl">{format(new Date(), "full")}</p>
            </section>

            <section className="ml-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ul className="list-decimal flex flex-col gap-8">
                        {/**Datos invisibles */}
                        <div>
                            <input type="hidden" defaultValue={FECHA_HOY}   {...register("fechaDiagnostico")} />
                            <input type="hidden" defaultValue={edad} {...register("edad")} />
                        </div>
                        {/**Peso */}
                        <li>
                            <div className="flex flex-col max-w-[400px]" ref={parent}>
                                <Field label={
                                    <InfoLabel info="en kg">
                                        <Label htmlFor="peso" className="font-bold" style={{ fontSize: "16px" }} required>Peso </Label>
                                    </InfoLabel>
                                }>

                                    <Input required min={0} max={200} step={0.01} type="number" id="peso"  {...register("peso", { valueAsNumber: true })} />
                                </Field>
                                {errors.peso && (
                                    <p className="text-sm text-red-600">{errors.peso.message}</p>
                                )}
                            </div>
                        </li>
                        {/**Estatura */}
                        <li>
                            <div className="flex flex-col max-w-[400px]" ref={parent}>
                                <Field label={
                                    <InfoLabel info="En cm">
                                        <Label htmlFor="estatura" className="font-bold" required>Estatura</Label>
                                    </InfoLabel>
                                }>

                                    <Input required min={0} max={300} type="number" id="estatura" {...register("estatura", { valueAsNumber: true })} />
                                </Field>
                                {errors.estatura && (
                                    <p className="text-sm text-red-600">{errors.estatura.message}</p>
                                )}
                            </div>
                        </li>
                        {/**Presion arterial */}
                        <li>
                            <div>
                                <p className="font-bold text-base">Presión arterial</p>
                            </div>
                            <div className="flex flex-col gap-[20px] max-w-[400px] mt-4" >
                                <Field label={
                                    <InfoLabel info="mmHg">
                                        <Label htmlFor="presion" className="font-semibold" required>Presión arterial, en 0 min.</Label>
                                    </InfoLabel>
                                }>
                                    <div className="flex flex-row gap-[100px]" >
                                        <div className="flex flex-col gap-2 items-center" ref={parent}>
                                            <Input required min={0} max={999} step={0.001} type="number" id="presion" {...register("presionArterialPAS_0min", { valueAsNumber: true })} />
                                            <span>PAS</span>
                                            {errors.presionArterialPAS_0min && (
                                                <p className="text-sm text-red-600 max-w-[15ch]">{errors.presionArterialPAS_0min.message}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 items-center" ref={parent}>
                                            <Input required min={0} max={999} step={0.001} type="number" id="presion" {...register("presionArterialPAD_0min", { valueAsNumber: true })} />
                                            <span>PAD</span>
                                            {errors.presionArterialPAD_0min && (
                                                <p className="text-sm text-red-600 max-w-[15ch]">{errors.presionArterialPAD_0min.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </Field>

                                {/**Parte 2 */}

                                <Field label={
                                    <InfoLabel info="mmHg">
                                        <Label htmlFor="presiona" className="font-semibold" required>Presión arterial, en 5 min.</Label>
                                    </InfoLabel>
                                }>

                                    <div className="flex flex-row gap-[100px]">
                                        <div className="flex flex-col gap-2 items-center" ref={parent}>
                                            <Input required min={0} max={999} step={0.001} type="number" id="presiona"  {...register("presionArterialPAS_5min", { valueAsNumber: true })} />
                                            <span>PAS</span>
                                            {errors.presionArterialPAS_5min && (
                                                <p className="text-sm text-red-600 max-w-[15ch]">{errors.presionArterialPAS_5min.message}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 items-center" ref={parent}>
                                            <Input required min={0} max={999} step={0.001} type="number" id="presiona" {...register("presionArterialPAD_5min", { valueAsNumber: true })} />
                                            <span>PAD</span>
                                            {errors.presionArterialPAD_5min && (
                                                <p className="text-sm text-red-600 max-w-[15ch]">{errors.presionArterialPAD_5min.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </Field>
                            </div>
                        </li>
                        {/**HbA1c*/}
                        <li>
                            <div className="flex flex-col max-w-[400px]" ref={parent}>
                                <Field label={
                                    <InfoLabel info="en %">
                                        <Label className="font-bold" required>HbA1c, ultimos 6 meses</Label>
                                    </InfoLabel>
                                }>

                                    <Input required min={0} max={99} step={0.01} type="number" {...register("hba1c", { valueAsNumber: true })} />
                                </Field>
                                {errors.hba1c && (
                                    <p className="text-sm text-red-600 ">{errors.hba1c.message}</p>
                                )}
                            </div>
                        </li>
                        {/**Año diagnostico*/}
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Label className="font-bold" required>Año de diagnóstico</Label>
                                <Select {...register("anioDiagnostico")} required>
                                    <option value="0">0 a 5 años</option>
                                    <option value="1">6 a 10 años</option>
                                    <option value="2"> &gt; 10 años</option>
                                </Select>
                            </div>
                        </li>
                        {/**Antecedentes*/}
                        <li>
                            <div className="flex flex-row min-w-[400px] max-w-[900px] gap-10" ref={parent}>
                                <div className="flex flex-col max-w-[400px]">
                                    <Label className="font-semibold" required>Antecedentes familiares de infarto o muerte cardiovascular de los padres a edades menores de 60 años</Label>
                                    <Select {...register("antecedFamiInfa")} required>
                                        <option value="0">No</option>
                                        <option value="1">Sí</option>
                                        <option value="2">Desconozco</option>
                                    </Select>
                                </div>
                                {
                                    watchShowAnte === "1" && (
                                        <div className="flex flex-col max-w-[450px]">
                                            <Label className="font-semibold" htmlFor="descripcion" required={watchShowAnte === '1'}>Descripción</Label>
                                            <Textarea style={{ width: "500px", height: "200px" }} {...register('descripcionAntecedentes', {
                                                required: watchShowAnte === '1',
                                            })}></Textarea>
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                        {/**HDL */}
                        <li>
                            <div className="flex flex-col max-w-[400px]" ref={parent}>
                                <Field label={
                                    <Label className="font-bold" required>HDL, ultimos 6 meses</Label>
                                }>
                                    <Input required min={0} max={99} step={0.01} type="number" {...register("hdl", { valueAsNumber: true })} />
                                </Field>
                                {errors.hdl && (
                                    <p className="text-sm text-red-600 ">{errors.hdl.message}</p>
                                )}
                            </div>
                        </li>
                        {/**TGG */}
                        <li>
                            <div className="flex flex-col max-w-[400px]" ref={parent}>
                                <Field label={
                                    <Label className="font-bold" required>TGC, ultimos 6 meses</Label>
                                }>
                                    <Input  required min={0} max={999} step={0.01} type="number" {...register("tgc", { valueAsNumber: true })} />
                                </Field>
                                {errors.tgc && (
                                    <p className="text-sm text-red-600 ">{errors.tgc.message}</p>
                                )}
                            </div>
                        </li>
                        {/**Educacion*/}
                        <li>
                            <div className="flex flex-row min-w-[400px] max-w-[900px] gap-10" ref={parent}>
                                <div className="flex flex-col min-w-[400px]">
                                    <Label className="font-semibold" required>Nivel de educación</Label>
                                    <Select {...register("educacion")}  required>
                                        {
                                            NIVEL_ESTUDIO.map(({ value, estudio }) => (
                                                <option key={value} value={value}>{estudio}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                {
                                    watchShowEdu === "5" && (
                                        <div className="flex flex-col max-w-[450px]">
                                            <Label htmlFor="desde-cuando" required>¿Cuál otra educación?</Label>
                                            <Textarea style={{ width: "500px", height: "200px" }} {...register('detalleEducacion', {
                                                required: watchShowEdu === '5',
                                            })}></Textarea>
                                        </div>
                                    )
                                }
                            </div>
                        </li>
                        {/**Estado civil */}
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Label className="font-bold" required>Estado civil</Label>
                                <Select {...register("estadoCivil")} required>
                                    {
                                        ESTADO_CIVIL.map(({ value, estado }) => (
                                            <option key={value} value={value}>{estado}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </li>
                        {/**Inyectable */}
                        <li>
                            <div className="flex flex-col max-w-[400px]  gap-10" ref={parent}>
                                <div className="flex flex-col min-w-[400px]">
                                    <Label className="font-bold" required>Utiliza tratamiento inyectable</Label>
                                    <Select {...register("usaTratamientoInyectable", { valueAsNumber: true })} required >
                                        <option value={0}>No</option>
                                        <option value={1}>Sí</option>
                                    </Select>
                                </div>
                                {watchShowIny === 1 && (
                                    <div className="flex flex-row gap-5 max-w-[400px]">
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="desde-cuando" required>Desde cuándo</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('desdeCuandoIn', {
                                                required: watchShowIny === 1,
                                            })}></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="dosisIn" required>Dosis</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('dosisIn', {
                                                required: watchShowIny === 1,
                                            })}></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="tipoNom" required>Tipo o nombre</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('tipoNombreIn', {
                                                required: watchShowIny === 1,
                                            })}></Textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                        {/**Oral */}
                        <li>
                            <div className="flex flex-col max-w-[400px]  gap-10" ref={parent}>
                                <div className="flex flex-col min-w-[400px]">
                                    <Label className="font-bold" required>Utiliza tratamiento oral</Label>
                                    <Select {...register("usaTratamientoOral", { valueAsNumber: true })} required >
                                        <option value={0}>No</option>
                                        <option value={1}>Sí</option>
                                    </Select>
                                </div>
                                {watchShowOr === 1 && (
                                    <div className="flex flex-row gap-5 max-w-[400px]">
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="desde-cuando" required>Desde cuándo</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('desdeCuandoOr', {
                                                required: watchShowOr === 1,
                                            })}></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="dosisIn" required>Dosis</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('dosisOr', {
                                                required: watchShowOr === 1,
                                            })}></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[300px]">
                                            <Label className="font-semibold" htmlFor="tipoNom" required>Nombre del Medicamento</Label>
                                            <Textarea style={{ width: "300px", height: "100px" }} {...register('nombreMedicamentoOr', {
                                                required: watchShowOr === 1,
                                            })}></Textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                    <div className="mt-20 flex gap-12 items-center">
                        <Link to={`/dashboard/pacientes/${String(id)}`}><Button >Cancelar</Button></Link>
                        <Button type="submit" appearance="primary">
                            Crear Registro
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    )
}