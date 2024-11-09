import { actualizarPaciente, eliminarPaciente, getPaciente } from "@/services/PacienteController";
import { Button, Card, Toast, ToastTitle, ToastTrigger, useId, useToastController, Link } from "@fluentui/react-components";
import { Link as LinkR, useNavigate, useParams } from "react-router-dom"
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import TablaRegistros from "@/ui/Tablas/TablaRegistros";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";
import { AvatarPaciente } from "@/componets/AvatarPaciente";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PacienteActualizar } from "@/models/types";
import DialogActualiPaciente from "@/ui/ProcesarPacientes/DialogActualiPaciente";
import ButtonDocxPaciente from "@/Docx/DatosPaciente/ButtonDocxPaciente";
import DialogDeletePaciente from "@/ui/ProcesarPacientes/DialogDeletePaciente";


export default function VisualizarPaciente() {
    const { id } = useParams();
    const safeId = id!;
    const queryClient = useQueryClient();
    const unico = 0
    const navigate = useNavigate();

    const { data: pacienteData, isError, isLoading} = useQuery(
        {
            queryKey: ['paciente', id],
            queryFn: async () => {
                const result = await getPaciente(String(id));
                if (result) {
                    return { paciente: { ...result[unico] }, existe: true };
                } else {
                    return { paciente: null, existe: false };
                }
            },
            initialData: {
                paciente: {
                    id: "N/A",
                    primerNombre: "N/A",
                    segundoNombre: "N/A",
                    apellidoPaterno: "N/A",
                    apellidoMaterno: "N/A",
                    fechaRegistro: new Date().toISOString(),
                    fechaNacimiento: new Date().toISOString(),
                    sexo: "N/A",
                },
                existe: false,
            },
            refetchOnWindowFocus: true,
            refetchOnMount: 'always',
        }
    )


    // Mutación para actualizar paciente
    const mutation = useMutation({
        mutationFn: (nuevoPaciente: PacienteActualizar) => actualizarPaciente(nuevoPaciente),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["paciente", id] });
        },
        onError: (error) => {
            console.error("Error al actualizar el paciente:", error);
        },
    });

    const handleActualizarPaciente = async (data: PacienteActualizar): Promise<boolean> => {
        try {
            await mutation.mutateAsync(data);
            return true;
        } catch (error) {
            console.error("Error durante la actualización:", error);
            return false;
        }
    };


    //Borrar paciente
    //Tostada
    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);
    const notify = (message: string, type: "success" | "error") => {
        dispatchToast(
            <Toast>
                <ToastTitle
                    action={
                        <ToastTrigger>
                            <Link>Cerrar</Link>
                        </ToastTrigger>
                    }
                >
                    {message}
                </ToastTitle>
            </Toast>,
            { intent: type } // success o error
        );
    };


    const handleDeletePaciente = async () => {
        if (!pacienteData || !pacienteData.paciente || !pacienteData.paciente.id) {
            console.error("Datos del paciente no están disponibles para eliminar.");
            return;
        }
        try {
            const res = await eliminarPaciente(pacienteData.paciente.id);
            if (res) {
                notify(`Paciente ${pacienteData.paciente.primerNombre} eliminado`, "success");
                navigate(`/dashboard/pacientes/`);
                alert("Paciente eliminado")
            }
        } catch (error) {
            console.error("Error al eliminar el paciente:", error);
            notify("Error al eliminar el paciente", "error");
        }
    };

    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error al cargar datos.</div>;

    return (
        <>
            <section className="flex justify-start">
                <LinkR to="/dashboard/pacientes"><Button icon={<ArrowLeft20Filled />}>Pacientes</Button></LinkR>

            </section>

            <section className="pt-10">
                <article>
                    <Card style={{ padding: "20px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between" }} className="shadow-sm">
                        <ul className="text-base">
                            <li className="flex gap-4 items-center">
                                <AvatarPaciente edad={calcularEdad(pacienteData.paciente.fechaNacimiento).valor}
                                    label={`${pacienteData.paciente.primerNombre} ${pacienteData.paciente.apellidoPaterno}`}
                                    tamanio="45px"
                                />
                                <h1 className="text-3xl font-semibold">{pacienteData.paciente.primerNombre} {pacienteData.paciente.segundoNombre} {pacienteData.paciente.apellidoPaterno} {pacienteData.paciente.apellidoMaterno}</h1>
                            </li>

                            <li className="mt-4">
                                <h2 className="font-semibold">Fecha de registro: <span className="font-normal">{format(pacienteData.paciente.fechaRegistro, "long")}</span> </h2>
                            </li>

                            <li className="grid grid-cols-2 gap-10 mt-4">
                                <h2 className="font-semibold">Fecha nacimiento:  <span className="font-normal">{format(pacienteData.paciente.fechaNacimiento, "long")}</span></h2>
                                <h2 className="font-semibold">Edad: <span className="font-normal">{calcularEdad(pacienteData.paciente.fechaNacimiento).texto}</span></h2>
                            </li>

                            <li>
                                <h2 className="font-semibold">Sexo: <span className="font-normal">{pacienteData.paciente.sexo}</span></h2>
                            </li>
                        </ul>

                        <ul className="flex flex-col gap-3 justify-center">
                            <li>
                                <DialogActualiPaciente paciente={pacienteData.paciente} actualizar={handleActualizarPaciente} />
                            </li>

                            <li>
                                <ButtonDocxPaciente paciente={pacienteData.paciente} />
                            </li>
                            <li>
                                <DialogDeletePaciente eliminar={handleDeletePaciente} />
                            </li>
                        </ul>
                    </Card>
                </article>
            </section>
            <section className="mt-10">
                <div className="flex justify-end">
                    {pacienteData.existe && (
                        <LinkR to={`/dashboard/pacientes/${String(id)}/crear-registro`}>
                            <Button appearance="primary" icon={<Add20Filled />}>Crear Registro</Button>
                        </LinkR>
                    )}
                </div>
                <TablaRegistros id={safeId} />
            </section>
        </>
    );
}
