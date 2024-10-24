import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    Input,
    Label,
    makeStyles,
    useId,
    useToastController,
    Toast,
    ToastTitle,
    ToastTrigger,
    Link,
    Toaster,
} from "@fluentui/react-components";

import { Add20Filled, Checkmark20Filled, Dismiss20Filled, SpinnerIos20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaPacienteRegistro } from "@/schemas/formSchemaPacientes";
import { Paciente } from "@/models/types";
import { usePacienteStore } from "@/store/storePacientes";
import { useState } from "react";



const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function DialogRegiPaciente() {
    //hooks
    const styles = useStyles();
    const Schema = formSchemaPacienteRegistro
    const registrarPaciente = usePacienteStore((state) => state.registrarPaciente);
    const [loading, setLoading] = useState<boolean>(false);

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


    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            primerNombre: "",
            segundoNombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            fechaNacimiento: ""
        },
    });



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataPaciente: Paciente = data;
        try {
            setLoading(true);
            const registrado: boolean = await registrarPaciente(dataPaciente);
            if (registrado) {
                setLoading(false);
                notify(`Paciente ${data.primerNombre} registrado con éxito`, "success");
            } else {
                notify("Error durante el registro del paciente", "error");
            }
            reset();
        } catch (error) {
            // Notificar error
            setLoading(false);
            notify("Error durante el registro del paciente", "error");
            console.log("Error durante el registro:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog >
            <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" icon={<Add20Filled />}>Nuevo Paciente</Button>
            </DialogTrigger>
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogBody>
                        <DialogTitle>Registrar Paciente</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Label required htmlFor="primerNombre">
                                Primer Nombre
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Fabian"
                                {...register("primerNombre")}
                                disabled={loading}
                            />
                            {errors.primerNombre && (
                                <p className="text-sm text-red-600">{errors.primerNombre.message}</p>
                            )}


                            <Label htmlFor="segundoNombre">
                                Segundo Nombre (opcional)
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Andrés"
                                {...register("segundoNombre")}
                                disabled={loading}
                            />
                            {errors.segundoNombre && (
                                <p className="text-sm text-red-600">{errors.segundoNombre.message}</p>
                            )}

                            <Label required htmlFor="apellidoPaterno">
                                Apellido Paterno
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Pérez"
                                {...register("apellidoPaterno")}
                                disabled={loading}
                            />
                            {errors.apellidoPaterno && (
                                <p className="text-red-600 text-sm">{errors.apellidoPaterno.message}</p>
                            )}

                            <Label htmlFor="apellidoMaterno">
                                Apellido Materno (opcional)
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Gómez"
                                {...register("apellidoMaterno")}
                                disabled={loading}
                            />
                            {errors.apellidoMaterno && (
                                <p className="text-red-600 text-sm">{errors.apellidoMaterno.message}</p>
                            )}

                            <Label required htmlFor="fechaNacimiento">
                                Fecha de Nacimiento
                            </Label>
                            <Input
                                appearance="underline"
                                type="date"
                                {...register("fechaNacimiento")}
                                disabled={loading}
                            />
                            {errors.fechaNacimiento && (
                                <p className="text-red-600 text-sm">{errors.fechaNacimiento.message}</p>
                            )}


                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary" disabled={loading} icon={<Dismiss20Filled />}>Cerrar</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary" disabled={loading}
                                icon={loading ? <SpinnerIos20Filled className="w-3 animate-spin" /> : <Checkmark20Filled />}
                            >
                                Crear
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
                <Toaster toasterId={toasterId} />
            </DialogSurface>
        </Dialog>
    );
}