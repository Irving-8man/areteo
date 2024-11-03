import { PacienteRegistrado, RegistroMedicoDB } from "@/models/types";
import { getPaciente } from "@/services/PacienteController";
import { borrarRegistroMedico, getRegistroMedico, getTratamientoInyectable, getTratamientoOral } from "@/services/RegistrosMedicoController";
import { Button, Card } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";
import ButtonDocxReEx from "@/Docx/DatosPaciente/ButtonDocxReEx";
import DialogDeleteRegistro from "@/ui/DialogDeleteRegistro";

export default function VerResulRegistro() {
    const { id, idRegis } = useParams();
    const idSafe = id!;
    const idRegiSafe = idRegis!;
    const unico = 0;
    const navigate = useNavigate();


    const { data: RegistroData, isError } = useQuery(
        {
            queryKey: ['registro', idSafe, idRegiSafe],
            queryFn: async () => {
                let inyectable = null;
                let oral = null;
                const registro = await getRegistroMedico(idRegiSafe);
                const pacienteDB = await getPaciente(idSafe);


                if (registro[unico] && pacienteDB[unico]) {
                    const registroMedico: RegistroMedicoDB = registro[unico];
                    const paciente: PacienteRegistrado = pacienteDB[unico];
                    const usaTratamientoInyectable = registroMedico.usaTratamientoInyectable === "true";
                    const usaTratamientoOral = registroMedico.usaTratamientoOral === "true";

                    if (usaTratamientoInyectable && usaTratamientoOral) {
                        inyectable = await getTratamientoInyectable(idRegiSafe);
                        oral = await getTratamientoOral(idRegiSafe);



                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico }, trataInyec: inyectable[unico], trataOral: oral[unico] };

                    } else if (usaTratamientoInyectable) {
                        inyectable = await getTratamientoInyectable(idRegiSafe);
                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico }, trataInyec: inyectable[unico] };

                    } else if (usaTratamientoOral) {
                        oral = await getTratamientoOral(idRegiSafe);
                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico }, trataOral: oral[unico] };
                    } else {
                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico } };
                    }

                } else {
                    return { pacienteConRe: null, registro: null };
                }
            },
            refetchOnWindowFocus: false
        }
    )
    if (isError) {
        return <div>Error al cargar los datos.</div>;
    }

    if (!RegistroData) {
        return <div>Cargando...</div>;
    }

    const { pacienteConRe, registro, trataInyec, trataOral } = RegistroData;

    
    const handleDeleteRegistro = async () => {
        if (!registro || !RegistroData.registro || !registro.id) {
            console.error("Datos registro no están disponibles para eliminar.");
            return;
        }
        try {
            const res = await borrarRegistroMedico(idRegiSafe);
            if (res) {
                alert("Registro eliminado")
                navigate(`/dashboard/pacientes/${String(idSafe)}`);
            }
        } catch (error) {
            console.error("Error al eliminar el paciente:", error);
            alert("Fallo en eliminar registro")
        }
    };


    return (
        <>
            <section className="flex justify-between">
                <Link to={`/dashboard/pacientes/${String(idSafe)}`}><Button icon={<ArrowLeft20Filled />}>Volver</Button></Link>
            </section>

            <section className="text-base">
                {pacienteConRe ? (
                    <div>
                        <div className="text-center mb-12">
                            <h1 className="font-bold text-2xl underline">Registro Médico</h1>
                        </div>
                        <div className="flex justify-center items-center gap-6 my-5">
                            <ButtonDocxReEx paciente={pacienteConRe} registro={registro} trataOral={trataOral} tratInye={trataInyec} />
                            <DialogDeleteRegistro eliminar={handleDeleteRegistro} />
                        </div>

                        <Card style={{ padding: "25px" }}>
                            <article>
                                <h2 className="font-semibold text-xl">Información del Paciente</h2>
                                <div className="mt-2 flex flex-col gap-1">
                                    <p>Nombre: {pacienteConRe.primerNombre} {pacienteConRe.segundoNombre || ''} {pacienteConRe.apellidoPaterno} {pacienteConRe.apellidoMaterno || ''}</p>
                                    <p>Fecha de Nacimiento:  {format(pacienteConRe.fechaNacimiento, "long")}</p>
                                    <p>Edad: {calcularEdad(pacienteConRe.fechaNacimiento).texto}</p>
                                    <p>Sexo: {pacienteConRe.sexo}</p>
                                    <p>Fecha de Registro: {format(pacienteConRe.fechaRegistro, "full")}</p>
                                </div>
                            </article>

                            <article className="mt-5">
                                <h2 className="font-semibold text-xl">Datos del Registro Médico</h2>
                                <div className="columns-2">
                                    <p className="font-semibold">Fecha de Diagnóstico: <span className="font-normal">{format(registro.fechaDiagnostico, "full")}</span></p>
                                    <p>Edad: {registro.edadDicha}</p>
                                    <p>Peso: {registro.peso} kg</p>
                                    <p>Estatura: {registro.estatura} cm</p>
                                    <p>Presión Arterial (0 min): {registro.presionArterialPAS_0min}/{registro.presionArterialPAD_0min} mmHg</p>
                                    <p>Presión Arterial (5 min): {registro.presionArterialPAS_5min}/{registro.presionArterialPAD_5min} mmHg</p>
                                    <p>HbA1c: {registro.hba1c}%</p>
                                    <p>Año de Diagnóstico: {registro.anioDiagnostico}</p>
                                    <p>Antecedentes Familiares: {registro.antecedFamiInfa}</p>
                                    <p>Descripcion de Antecedentes: {registro.descripcionAntecedentes || ''}</p>
                                    <p>HDL: {registro.hdl} mg/dL</p>
                                    <p>TGC: {registro.tgc} mg/dL</p>
                                    <p>Educación: {registro.educacion}</p>
                                    <p>Detalles de educación: {registro.detalleEducacion || ''}</p>
                                    <p>Estado civil: {registro.estadoCivil}</p>
                                </div>
                            </article>

                            {trataInyec && (
                                <article className="mt-5">
                                    <h2 className="font-semibold text-lg">Tratamiento Inyectable</h2>
                                    <div>
                                        <p>Tipo: {trataInyec.tipoNombreIn}</p>
                                        <p>Dosis: {trataInyec.dosisIn}</p>
                                        <p>Desde: {trataInyec.desdeCuandoIn}</p>
                                    </div>

                                </article>
                            )}
                            {trataOral && (
                                <article className="mt-5">
                                    <h2 className="font-semibold text-lg">Tratamiento Oral</h2>
                                    <div>
                                        <p>Medicamento: {trataOral.nombreMedicamentoOr}</p>
                                        <p>Dosis: {trataOral.dosisOr}</p>
                                        <p>Desde: {trataOral.desdeCuandoOr}</p>
                                    </div>
                                </article>
                            )}
                        </Card>
                    </div>
                ) : (
                    <p>No se encontró información del paciente o del registro médico.</p>
                )}
            </section>
        </>

    )
}