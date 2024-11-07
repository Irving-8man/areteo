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
} from "@fluentui/react-components";

import { Checkmark20Filled, Dismiss20Filled, Dismiss24Regular, SpinnerIos20Filled, PasswordRegular } from "@fluentui/react-icons";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formSchemaComprobarContra } from "@/schemas/formSchemaAdmin";


const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

type DialogConfirmContraProps = {
    abrir: boolean;
    onConfirm: (contrasenaAnterior: string) => Promise<boolean>; // Espera un booleano como respuesta
    onCancel: () => void;
};

export default function DialogConfirmContra({ abrir, onConfirm, onCancel }: DialogConfirmContraProps) {
    //hooks
    const [parent] = useAutoAnimate()
    const styles = useStyles();
    const Schema = formSchemaComprobarContra
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(abrir);


    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    });


    // Procesar la confirmación de contraseña anterior
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        setLoading(true);
        const isConfirmed = await onConfirm(data.contrasenia);
        if (isConfirmed) {
            setOpen(false);
            reset();
        } else {
            open
        }
        setLoading(false);
    };


    return (
        <>
            <Dialog open={abrir} onOpenChange={(_event, data) => setOpen(data.open)}>
                <DialogSurface aria-describedby={undefined}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogBody>
                            <DialogTitle
                                action={
                                    <DialogTrigger action="close">
                                        <Button
                                            appearance="subtle"
                                            aria-label="close"
                                            onClick={onCancel}
                                            icon={<Dismiss24Regular />}
                                        />
                                    </DialogTrigger>
                                }
                            >
                                <span className="text-zinc-600">
                                    Cambiar contraseña
                                </span>
                            </DialogTitle>
                            <DialogContent className={styles.content} ref={parent} >
                                <ul className="flex flex-col gap-6 mt-6">
                                    <li className="flex flex-col gap-2">
                                        <Label className="block font-medium" required>Contraseña anterior</Label>
                                        <Input disabled={loading} appearance="underline" className="min-w-[300px]" required contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("contrasenia")} />
                                        {errors.contrasenia && (
                                            <p className="text-sm text-red-600">{errors.contrasenia.message}</p>
                                        )}
                                    </li>

                                </ul>

                            </DialogContent>

                            <DialogActions className="mt-4">
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary" onClick={onCancel} disabled={loading} icon={<Dismiss20Filled />}>Cancelar</Button>
                                </DialogTrigger>
                                <Button style={{ "backgroundColor": "red", "color": "white" }} type="submit" appearance="primary" disabled={loading}
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