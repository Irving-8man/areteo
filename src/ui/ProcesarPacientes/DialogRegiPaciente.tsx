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
    Select,
} from "@fluentui/react-components";

import { Add20Filled, Checkmark20Filled, Dismiss20Filled, Dismiss24Regular, SpinnerIos20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaPacienteRegistro } from "@/schemas/formSchemaPacientes";
import { Paciente } from "@/models/types";
import { usePacienteStore } from "@/store/storePacientes";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { format } from "@formkit/tempo"
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        marginTop:"15px"
    },
});

export default function DialogRegiPaciente() {
    //hooks
    const [parent] = useAutoAnimate()
    const styles = useStyles();
    const Schema = formSchemaPacienteRegistro
    const registrarPaciente = usePacienteStore((state) => state.registrarPaciente);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();



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
            apellidoPaterno: "",
            fechaNacimiento: "",
            sexo: "Masculino"
        },
    });



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataPaciente: Paciente = data;
        try {
            setLoading(true);
            const registrado = await registrarPaciente(dataPaciente);
            if (registrado) {
                setLoading(false);
                setOpen(false)
                alert(`Paciente ${data.primerNombre} Registrado`);
                navigate(`/dashboard/pacientes/${registrado?.id}`);
            }else{
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
        <>
            <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement >
                    <Button appearance="primary" icon={<Add20Filled />}>Nuevo Paciente</Button>
                </DialogTrigger>
                <DialogSurface aria-describedby={undefined}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogBody>
                            <DialogTitle
                                action={
                                    <DialogTrigger action="close">
                                        <Button
                                            appearance="subtle"
                                            aria-label="close"
                                            icon={<Dismiss24Regular />}
                                        />
                                    </DialogTrigger>
                                }
                            >
                                <span className="text-zinc-600">
                                    Registrar Paciente
                                </span>
                            </DialogTitle>
                            <DialogContent className={styles.content} ref={parent} >
                                <ul className="flex flex-col gap-6">
                                    <li className="flex flex-col gap-2">
                                        <Label required htmlFor="primerNombre" className="font-semibold">
                                            Primer Nombre
                                        </Label>
                                        <Input
                                            appearance="underline"
                                            placeholder="Ej. Fabian"
                                            {...register("primerNombre")}
                                            disabled={loading}
                                            required
                                        />
                                        {errors.primerNombre && (
                                            <p className="text-sm text-red-600">{errors.primerNombre.message}</p>
                                        )}
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <Label htmlFor="segundoNombre" className="font-semibold">
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
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <Label required htmlFor="apellidoPaterno" className="font-semibold">
                                            Apellido Paterno
                                        </Label>
                                        <Input
                                            appearance="underline"
                                            placeholder="Ej. Pérez"
                                            {...register("apellidoPaterno")}
                                            disabled={loading}
                                            required
                                        />
                                        {errors.apellidoPaterno && (
                                            <p className="text-red-600 text-sm">{errors.apellidoPaterno.message}</p>
                                        )}
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <Label htmlFor="apellidoMaterno" className="font-semibold">
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
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <Label required htmlFor="fechaNacimiento" className="font-semibold">
                                            Fecha de Nacimiento
                                        </Label>
                                        <Input
                                            appearance="underline"
                                            type="date"
                                            {...register("fechaNacimiento")}
                                            disabled={loading}
                                            max={format(new Date(), "YYYY-MM-DD")}
                                            min="1890-01-01"
                                            required
                                        />
                                        {errors.fechaNacimiento && (
                                            <p className="text-red-600 text-sm">{errors.fechaNacimiento.message}</p>
                                        )}
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <Label htmlFor="sexo" required className="font-semibold">Sexo</Label>
                                        <Select id="sexo" {...register("sexo")}>
                                            <option>Masculino</option>
                                            <option>Femenino</option>
                                        </Select>
                                    </li>
                                </ul>

                            </DialogContent>

                            <DialogActions className="mt-4">
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
                </DialogSurface>
            </Dialog>
            <Toaster toasterId={toasterId} />
        </>
    );
}