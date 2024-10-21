import { Button, Field, Label, Select, Textarea, Input, InfoLabel } from "@fluentui/react-components"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaCrearRegistro } from "@/schemas/formSchemaRegistro";
import { ChangeEvent, useEffect, useState } from "react";
import { PacienteRegistrado } from "@/models/types";
import { getPaciente } from "@/services/PacienteController";
import { calcularEdad } from "@/utils/CalcularEdad";
import { format } from "@formkit/tempo";


const FECHA_HOY = format(new Date(), "YYYY-MM-DD")
const NIVLESESTUDIO = [
    "Sin estudio", "Primaria", "Secundaria", "Preparatoria", "Licenciatura", "Otro"
];

const ESTADOCIVIL = [
    "Soltero", "Casado", "Unión libre", "Divorciado/ separado", "Viudo"
];

export default function CrearRegistro() {
    const { id } = useParams()
    const [paciente, setPaciente] = useState<null | PacienteRegistrado>(null)
    const [edad, setEdad] = useState<number>(0)
    const [sexo,setSexo] = useState<string>("Masculino")
    const unico = 0
    //Recuperar al paciente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPaciente(String(id))
                if (res) {
                    setPaciente(res[unico])
                    setEdad(calcularEdad(res[unico].fechaNacimiento));
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
    const { register, handleSubmit, formState: { errors }, reset ,setValue} = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            paciente_id: id,
            fechaDiagnostico: FECHA_HOY,
            sexo: "",
            edad: 0,
            peso:0,
            estatura: 0,
            presionArterialPAS_0min: 0,
            presionArterialPAD_0min: 0,
            presionArterialPAS_5min: 0,
            presionArterialPAD_5min: 0,
            hba1c: 0,
            anioDiagnostico: "",
            antecedFamiInfa: "",
            descripcionAntecedentes: "",
            hdl: 0,
            tgc: 0,
            educacion: "",
            detalleEducacion: "",
            estadoCivil: "",
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
            nombreMedicamentoIn: "",
        },
    });


    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        //Ajustes
        data.edad = edad
        data.sexo = sexo
        console.log(data)
    };

    //Manejo de formulario
    const [tieneAntece, setTieneAntece] = useState(0);
    const [tieneEdu, setTieneEdu] = useState(0);
    const [tratInyect, setTratInyect] = useState(0);
    const [tratOral, setTratOral] = useState(0);
    const SiTieneTrat = 1;
    const SiTieneAntece = 1;
    const OtroEduc = 5;
    const handleSelectChangeAnte = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTieneAntece(Number(e.target.value));
    };

    const handleSelectChangeEdu = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTieneEdu(Number(e.target.value));
    };

    const handleSelectChangeInyect = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTratInyect(Number(e.target.value));
    };

    const handleSelectChangeOral = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTratOral(Number(e.target.value));
    };


    return (
        <div>
            <section className="flex justify-between">
                <Link to={`/dashboard/pacientes/${String(id)}`}><Button icon={<ArrowLeft20Filled />}>Volver</Button></Link>
            </section>

            <section className="w-full">
                    {calcularEdad(paciente?.fechaNacimiento)}
            </section>

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ul className="flex flex-col gap-[40px]">
                        <li>
                            <input type="hidden" defaultValue={FECHA_HOY}   {...register("fechaDiagnostico")} />
                            <input type="hidden" defaultValue={edad} {...register("edad")} />
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Field label={
                                    <InfoLabel info="en kg">
                                        <Label htmlFor="peso" required>Peso </Label>
                                    </InfoLabel>
                                }>

                                    <Input min={0} max={200} step={0.01} type="number" id="peso" />
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Field label={
                                    <InfoLabel info="en cm">
                                        <Label htmlFor="altura" required>Altura</Label>
                                    </InfoLabel>
                                }>

                                    <Input min={0} max={300} type="number" id="altura" />
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col gap-[20px] max-w-[400px]">
                                <Field label={
                                    <InfoLabel info="mmHg">
                                        <Label htmlFor="presion" required>Presión arterial, en 0 min.</Label>
                                    </InfoLabel>
                                }>
                                    <div className="flex flex-row gap-[20px]">
                                        <div className="flex flex-col gap-2 items-center">
                                            <Input min={0} max={999} step={0.001} type="number" id="presion" />
                                            <span>PAS</span>
                                        </div>

                                        <div className="flex flex-col gap-2 items-center">
                                            <Input min={0} max={999} step={0.001} type="number" id="presion" />
                                            <span>PAD</span>
                                        </div>
                                    </div>
                                </Field>

                                <Field label={
                                    <InfoLabel info="mmHg">
                                        <Label htmlFor="presiona" required>Presión arterial, en 5 min.</Label>
                                    </InfoLabel>
                                }>

                                    <div className="flex flex-row gap-[20px]">
                                        <div className="flex flex-col gap-2 items-center">
                                            <Input min={0} max={999} step={0.001} type="number" id="presiona" />
                                            <span>PAS</span>
                                        </div>

                                        <div className="flex flex-col gap-2 items-center">
                                            <Input min={0} max={999} step={0.001} type="number" id="presiona" />
                                            <span>PAD</span>
                                        </div>
                                    </div>
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Field label={
                                    <InfoLabel info="en %">
                                        <Label required>HbA1c, ultimos 6 meses</Label>
                                    </InfoLabel>
                                }>

                                    <Input min={0} max={99} step={0.01} type="number" />
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Label required>Año de diagnóstico</Label>
                                <Select  >
                                    <option>0 a 5 años</option>
                                    <option>6 a 10 años</option>
                                    <option> &gt; 10 años</option>
                                </Select>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-row min-w-[400px] max-w-[800px] gap-10">
                                <div className="flex flex-col max-w-[400px]">
                                    <Label required>Antecedentes familiares de infarto o muerte cardiovascular de los padres a edades menores de 60 años</Label>
                                    <Select value={tieneAntece} onChange={handleSelectChangeAnte}>
                                        <option value={0}>No</option>
                                        <option value={1}>Si</option>
                                        <option value={2}>Desconozco</option>
                                    </Select>
                                </div>
                                {
                                    tieneAntece === SiTieneAntece && (
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Descripción</Label>
                                            <Textarea></Textarea>
                                        </div>
                                    )
                                }

                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Field label={
                                    <Label required>HDL, ultimos 6 meses</Label>
                                }>

                                    <Input min={0} max={99} step={0.01} type="number" />
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Field label={
                                    <Label required>TGG, ultimos 6 meses</Label>
                                }>
                                    <Input min={0} max={999} step={0.01} type="number" />
                                </Field>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-row  min-w-[400px] max-w-[800px] gap-10">
                                <div className="flex flex-col max-w-[400px]">
                                    <Label required>Nivel de educación</Label>
                                    <Select value={tieneEdu} onChange={handleSelectChangeEdu}>
                                        {
                                            NIVLESESTUDIO.map((estudio, idx) => (
                                                <option key={idx} value={idx}>{estudio}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                {
                                    tieneEdu === OtroEduc && (
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>¿Cuál otra educación?</Label>
                                            <Textarea></Textarea>
                                        </div>
                                    )
                                }
                            </div>

                        </li>
                        <li>
                            <div className="flex flex-col max-w-[400px]">
                                <Label required>Estado civil</Label>
                                <Select  >
                                    {
                                        ESTADOCIVIL.map((estado, idx) => (
                                            <option key={idx} value={idx}>{estado}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-row min-w-[400px] max-w-[800px] gap-10">
                                <div className="flex flex-col max-w-[400px]">
                                    <Label required>Utiliza tratamiento inyectable</Label>
                                    <Select value={tratInyect} onChange={handleSelectChangeInyect}>
                                        <option value={0}>No</option>
                                        <option value={1}>Sí</option>
                                    </Select>
                                </div>
                                {tratInyect === SiTieneTrat && (
                                    <div className="flex flex-row gap-5 max-w-[400px]">
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Desde cuándo</Label>
                                            <Textarea></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Dosis</Label>
                                            <Textarea></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Tipo o nombre</Label>
                                            <Textarea></Textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-row min-w-[400px] max-w-[800px] gap-10">
                                <div className="flex flex-col max-w-[400px]">
                                    <Label required>Utiliza tratamiento oral</Label>
                                    <Select value={tratOral} onChange={handleSelectChangeOral}>
                                        <option value={0}>No</option>
                                        <option value={1}>Sí</option>
                                    </Select>
                                </div>
                                {tratOral === 1 && (
                                    <div className="flex flex-row gap-5 max-w-[400px]">
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Desde cuándo</Label>
                                            <Textarea></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Dosis</Label>
                                            <Textarea></Textarea>
                                        </div>
                                        <div className="flex flex-col max-w-[400px]">
                                            <Label htmlFor="desde-cuando" required>Nombre del medicamento</Label>
                                            <Textarea></Textarea>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>

                    <div className="mt-4">
                        <Button type="submit" appearance="primary">
                            Crear Registro
                        </Button>
                    </div>

                </form>
            </section>
        </div>
    )
}