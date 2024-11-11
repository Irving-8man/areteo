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
    Select,
} from "@fluentui/react-components";

import { Pen20Regular, Checkmark20Filled, Dismiss20Filled, Dismiss24Regular, SpinnerIos20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaPacienteActua } from "@/schemas/formSchemaPacientes";
import { PacienteActualizar, PacienteRegistrado } from "@/models/types";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { format } from "@formkit/tempo"




const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin"
    },
});

export default function DialogActualiPaciente({ paciente, actualizar }: { paciente: PacienteRegistrado, actualizar: (data: PacienteActualizar) => Promise<boolean>; }) {
    //hooks
    const [parent] = useAutoAnimate()
    const styles = useStyles();
    const Schema = formSchemaPacienteActua
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);


    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            id: paciente.id,
            primerNombre: paciente.primerNombre || "",
            segundoNombre: paciente.segundoNombre ?? "", // Aplica un valor vacío si es nulo o indefinido
            apellidoPaterno: paciente.apellidoPaterno || "",
            apellidoMaterno: paciente.apellidoMaterno ?? "", // Aplica un valor vacío si es nulo o indefinido
            sexo: paciente.sexo || "Masculino",
        },
    });


    useEffect(() => {
        if (paciente) {
            reset({
                id: paciente.id,
                primerNombre: paciente.primerNombre,
                segundoNombre: paciente.segundoNombre ?? "", // Asegura valor vacío si es nulo o indefinido
                apellidoPaterno: paciente.apellidoPaterno,
                apellidoMaterno: paciente.apellidoMaterno ?? "", // Asegura valor vacío si es nulo o indefinido
                sexo: paciente.sexo,
            });
        }
    }, [paciente, reset]);



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString();
        const dataPaciente: PacienteActualizar = data;
        try {
            setLoading(true);
            const success = await actualizar(dataPaciente);
            if (success) {
                setLoading(false);
                setOpen(false)
                alert(`Paciente ${data.primerNombre} actualizado`)
            } else {
                alert("Error durante la actualizacion de paciente, reintentar");
            }
            reset();
        } catch (error) {
            // Notificar error
            setLoading(false);
            alert("Error durante la actualizacion de paciente, reintentar");
            alert(`Error durante la actualizacion:${error}`);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement >
                    <Button appearance="secondary" icon={<Pen20Regular />}>Actualizar Datos</Button>
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
                                    Actualizar Datos de Paciente
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
                                            defaultValue={paciente.primerNombre}
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
                                            defaultValue={paciente.segundoNombre!}
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
                                            defaultValue={paciente.apellidoPaterno}
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
                                            defaultValue={paciente.apellidoMaterno!}
                                        />
                                        {errors.apellidoMaterno && (
                                            <p className="text-red-600 text-sm">{errors.apellidoMaterno.message}</p>
                                        )}
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <Label required htmlFor="fechaNacimiento" className="font-semibold">
                                                Fecha de Nacimiento
                                            </Label>
                                            <p className="font-normal ml-2">Fecha de nacimiento dada: <span className="text-red-600">{format(paciente.fechaNacimiento, "DD/MM/YYYY")}</span></p>
                                        </div>

                                        <Input
                                            appearance="underline"
                                            type="date"
                                            {...register("fechaNacimiento")}
                                            disabled={loading}
                                            max={format(new Date(), "YYYY-MM-DD")}
                                            required
                                        />
                                        {errors.fechaNacimiento && (
                                            <p className="text-red-600 text-sm">{errors.fechaNacimiento.message}</p>
                                        )}
                                    </li>

                                    <li className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <Label htmlFor="sexo" required className="font-semibold">Sexo</Label>
                                            
                                        </div>

                                        <Select id="sexo" {...register("sexo")}>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
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
                                    Actualizar
                                </Button>
                            </DialogActions>
                        </DialogBody>
                    </form>
                </DialogSurface>
            </Dialog>
        </>
    );
}