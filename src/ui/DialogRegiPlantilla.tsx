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
    Textarea,
} from "@fluentui/react-components";

import { Add20Filled, Checkmark20Filled, Dismiss20Filled, Dismiss24Regular, SpinnerIos20Filled } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plantilla } from "@/models/types";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formSchemaPlantilla } from "@/schemas/formSchemaPlantilla";


const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin"
    },
});

interface DialogRegiPlantillaProps {
    onSubmits: (data: Plantilla) => Promise<boolean>;
}


export default function DialogRegiPlantilla({ onSubmits }: DialogRegiPlantillaProps) {
    //hooks
    const [parent] = useAutoAnimate()
    const styles = useStyles();
    const Schema = formSchemaPlantilla
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

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
        },
    });



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataPlantilla: Plantilla = data;
        try {
            setLoading(true);
            const registrado = await onSubmits(dataPlantilla);
            if (registrado) {
                setLoading(false);
                setOpen(false)
                notify(`Plantilla ${data.nombre} creada con éxito`, "success");
            } else {
                notify("Error durante la creación de plantilla", "error");
            }
            reset();
            alert("Creado")
        } catch (error) {
            // Notificar error
            setLoading(false);
            notify("Error durante creación de plantilla", "error");
            console.log("Error durante el registro:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement >
                    <Button appearance="primary" icon={<Add20Filled />}>Nueva Plantilla</Button>
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
                                Nueva Plantilla
                            </DialogTitle>
                            <DialogContent className={styles.content} ref={parent} >
                                <Label required htmlFor="nombre">
                                    Nombre
                                </Label>
                                <Input
                                    appearance="underline"
                                    placeholder="Ej. Muestra de..."
                                    {...register("nombre")}
                                    disabled={loading}
                                    required
                                />
                                {errors.nombre && (
                                    <p className="text-sm text-red-600">{errors.nombre.message}</p>
                                )}

                                <Label required htmlFor="descripcion">
                                    Descripción
                                </Label>

                                <Textarea
                                    placeholder="Ej. Este intrumento tiene como proposito..."
                                    {...register("descripcion")}
                                    style={{ height: "130px" }}
                                    disabled={loading}
                                    required
                                ></Textarea>
                                {errors.descripcion && (
                                    <p className="text-sm text-red-600">{errors.descripcion.message}</p>
                                )}

                                <Label required htmlFor="nombre">
                                    Autor
                                </Label>
                                <Input
                                    appearance="underline"
                                    placeholder="Ej. Pedro Francisco"
                                    {...register("autor")}
                                    disabled={loading}
                                    required
                                />
                                {errors.autor && (
                                    <p className="text-sm text-red-600">{errors.autor.message}</p>
                                )}

                                <Label required htmlFor="nombre">
                                    Adaptación por ...
                                </Label>
                                <Input
                                    appearance="underline"
                                    placeholder="Ej. Antonia Sofia"
                                    {...register("adaptacionPor")}
                                    disabled={loading}
                                    required
                                />
                                {errors.adaptacionPor && (
                                    <p className="text-sm text-red-600">{errors.adaptacionPor.message}</p>
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
                </DialogSurface>
            </Dialog>
            <Toaster toasterId={toasterId} />
        </>
    );
}