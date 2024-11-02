import { actualizarPaciente, eliminarPaciente, getPaciente } from "@/services/PacienteController";
import { Button, Card, Toast, ToastTitle, ToastTrigger, useId, useToastController, Link } from "@fluentui/react-components";
import { Link as LinkR, useNavigate, useParams } from "react-router-dom"
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";
import TablaRegistros from "@/ui/TablaRegistros";
import { format } from "@formkit/tempo";
import { calcularEdad } from "@/utils/CalcularEdad";
import { AvatarPaciente } from "@/componets/AvatarPaciente";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PacienteActualizar } from "@/models/types";
import DialogActualiPaciente from "@/ui/DialogActualiPaciente";



export default function VisualizarPaciente() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const unico = 0
    const navigate = useNavigate();

    const { data: pacienteData, isError } = useQuery(
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
            }
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
            }
        } catch (error) {
            console.error("Error al eliminar el paciente:", error);
            notify("Error al eliminar el paciente", "error");
        }
    };
    


    if (isError) {
        return <p>Error al cargar los datos del paciente.</p>;
    }

    return (
        <>
            <section className="flex justify-between">
                <LinkR to="/dashboard/pacientes"><Button icon={<ArrowLeft20Filled />}>Volver</Button></LinkR>
                {pacienteData.existe && (
                    <LinkR to={`/dashboard/pacientes/${String(id)}/crear-registro`}>
                        <Button appearance="primary" icon={<Add20Filled />}>Crear Registro</Button>
                    </LinkR>
                )}
            </section>

            <section className="pt-10">
                <article>
                    <Card style={{ padding: "20px", display: "flex", flexFlow: "row wrap", justifyContent: "space-between" }}>
                        <ul className="text-base">
                            <li className="flex gap-4 items-center">
                                <AvatarPaciente edad={calcularEdad(pacienteData.paciente.fechaNacimiento).valor}
                                    label={`${pacienteData.paciente.primerNombre} ${pacienteData.paciente.apellidoPaterno}`}
                                    tamanio="45px"
                                />
                                <h1 className="text-3xl">{pacienteData.paciente.primerNombre} {pacienteData.paciente.segundoNombre} {pacienteData.paciente.apellidoPaterno} {pacienteData.paciente.apellidoMaterno}</h1>
                            </li>

                            <li className="mt-4">
                                <h2 className="font-semibold">Fecha de registro: <span className="font-normal">{format(pacienteData.paciente.fechaRegistro, "long")}</span> </h2>
                            </li>

                            <li className="grid grid-cols-2 gap-10">
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
                                <Button onClick={handleDeletePaciente}>Borrar</Button>
                            </li>

                        </ul>
                    </Card>
                </article>
            </section>
            <section>
                <TablaRegistros id={id} />
            </section>
        </>
    );
}
