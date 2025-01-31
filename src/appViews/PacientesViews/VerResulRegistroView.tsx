import { PacienteRegistrado, RegistroMedicoDB } from "@/models/types";
import { Button, Card } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft20Filled } from "@fluentui/react-icons";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";
import ButtonDocxReEx from "@/Docx/DatosPaciente/ButtonDocxReEx";
import DialogDeleteRegistro from "@/ui/ProcesarPacientes/DialogDeleteRegistro";
import { SqliteDatabase } from '@/services/repositorios/DatabaseSingle';
import { RegistroMedicoRepository } from '@/services/repositorios/RegistrosMedicoRepository';
import { PacienteRepository } from "@/services/repositorios/PacienteRepository";



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
                const db = await SqliteDatabase.getInstance();
                const registrosRepo = new RegistroMedicoRepository(db);
                const pacienteRepo = new PacienteRepository(db);
                let inyectable = null;
                let oral = null;
                const registro = await registrosRepo.getRegistroMedico(idRegiSafe);
                const pacienteDB = await pacienteRepo.getPaciente(idSafe);


                if (registro[unico] && pacienteDB[unico]) {
                    const registroMedico: RegistroMedicoDB = registro[unico];
                    const paciente: PacienteRegistrado = pacienteDB[unico];
                    const usaTratamientoInyectable = registroMedico.usaTratamientoInyectable === "true";
                    const usaTratamientoOral = registroMedico.usaTratamientoOral === "true";

                    if (usaTratamientoInyectable && usaTratamientoOral) {
                        inyectable = await registrosRepo.getTratamientoInyectable(idRegiSafe);
                        oral = await registrosRepo.getTratamientoOral(idRegiSafe);

                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico }, trataInyec: inyectable[unico], trataOral: oral[unico] };

                    } else if (usaTratamientoInyectable) {
                        inyectable = await registrosRepo.getTratamientoInyectable(idRegiSafe);
                        return { pacienteConRe: { ...paciente }, registro: { ...registroMedico }, trataInyec: inyectable[unico] };

                    } else if (usaTratamientoOral) {
                        oral = await registrosRepo.getTratamientoOral(idRegiSafe);
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
            const db = await SqliteDatabase.getInstance();
            const registrosRepo = new RegistroMedicoRepository(db);

            const res = await registrosRepo.borrarRegistroMedico(idRegiSafe);
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
                                <h2 className="font-bold text-xl">Información del Paciente</h2>
                                <ul className="mt-2 flex flex-col gap-1 list-disc pl-4">

                                    <li><p><span className="font-semibold text-stone-700">Nombre:</span> {pacienteConRe.primerNombre} {pacienteConRe.segundoNombre || ''} {pacienteConRe.apellidoPaterno} {pacienteConRe.apellidoMaterno || ''}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Fecha de Nacimiento:</span> {format(pacienteConRe.fechaNacimiento, "long")} </p></li>
                                    <li><p><span className="font-semibold text-stone-700">Edad:</span> {calcularEdad(pacienteConRe.fechaNacimiento).texto} </p></li>
                                    <li><p><span className="font-semibold text-stone-700">Sexo:</span> {pacienteConRe.sexo}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Fecha de Registro:</span> {format(pacienteConRe.fechaRegistro, { date: "full", time: "short" })}</p></li>
                                </ul>
                            </article>

                            <article className="mt-5">
                                <h2 className="font-bold text-xl">Datos del Registro Médico</h2>
                                <ul className="columns-2 list-disc pl-4 mt-2">
                                    <li><p><span className="font-semibold text-stone-700">Fecha de Diagnóstico:</span> {format(registro.fechaDiagnostico, "full")}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Peso:</span> {registro.peso} kg</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Estatura:</span> {registro.estatura} cm</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Presión Arterial (0 min):</span> {registro.presionArterialPAS_0min}/{registro.presionArterialPAD_0min} mmHg</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Presión Arterial (5 min):</span> {registro.presionArterialPAS_5min}/{registro.presionArterialPAD_5min} mmHg</p></li>
                                    <li><p><span className="font-semibold text-stone-700">HbA1c: </span> {registro.hba1c}%</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Año de Diagnóstico:</span> {registro.anioDiagnostico}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Antecedentes Familiares:</span>  {registro.antecedFamiInfa}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Descripción de Antecedentes:</span> {registro.descripcionAntecedentes || ''}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">HDL: </span> {registro.hdl} mg/dL</p></li>
                                    <li><p><span className="font-semibold text-stone-700">TGC: </span> {registro.tgc} mg/dL</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Educación: </span> {registro.educacion}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Detalles de educación: </span> {registro.detalleEducacion || ''}</p></li>
                                    <li><p><span className="font-semibold text-stone-700">Estado civil: </span> {registro.estadoCivil}</p></li>
                                </ul>
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