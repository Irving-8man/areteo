import { formSchemaActualizarContra } from "@/schemas/formSchemaAdmin";
import { Button, Card, Input, Label } from "@fluentui/react-components";
import { Checkmark20Filled, PasswordRegular, SpinnerIos20Filled } from "@fluentui/react-icons";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import DialogConfirmContra from "./DialogConfirmContra";
import { useSesion } from "@/hooks/useSesion";
import { hashPass, verificarContrasenia } from "@/utils/ProcesCredenciales";



export default function ActualizarContra() {
    const [loading, setLoading] = useState<boolean>(false);
    const Schema = formSchemaActualizarContra;
    const [parent] = useAutoAnimate();
    const [preContra, setPreContra] = useState<string>("")

    // Configuración de useForm con Zod para validación
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    });

    const { isAdmin, cambiarContrasenia } = useSesion();

    if (!isAdmin) {
        return (
            <div className="">

                <h3 className="text-2xl">No existe administrador</h3>
            </div>
        )
    }

    // Procesar el formulario
    const onSubmit = (data: z.infer<typeof Schema>) => {
        try {
            setPreContra(data.contrasenia);
            setLoading(true);
            reset();
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un problema al procesar la solicitud.');
            setLoading(false); // Detener el loading si hay error
        }
    };

    // Validación de la contraseña anterior en el diálogo
    const handleConfirm = async (contrasenaAnterior: string): Promise<boolean> => {
        try {
            const isValid = await verificarContrasenia(contrasenaAnterior, isAdmin.contrasenia);
            if (isValid) {
                const nuevaContra = await hashPass(preContra);
                await cambiarContrasenia(nuevaContra);
                alert("Contraseña actualizada con éxito.");
                return true;
            } else {
                alert('Contraseña incorrecta.');
                setLoading(false);
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert('No se pudo actualizar la contraseña.');
            return false;
        } finally {
            setLoading(false);
        }
    };


    const onCancel = () => {
        setLoading(false); // Detiene cualquier proceso de carga
    };

    return (
        <article className="w-2/3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card style={{ padding: "25px" }}>
                    <h2 className="font-bold text-xl text-red-600 mb-5">Actualizar Contraseña</h2>
                    <div className="mb-5" >
                        <ul className="flex flex-col gap-8">
                            <li className="flex flex-col gap-2" ref={parent}>
                                <Label required className="font-semibold">
                                    Nueva Contraseña
                                </Label>
                                <Input disabled={loading}
                                    required appearance="underline" className="min-w-[300px]" contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("contrasenia")} />
                                {errors.contrasenia && (
                                    <p className="text-sm text-red-600">{errors.contrasenia.message}</p>
                                )}
                            </li>

                            <li className="flex flex-col gap-2" ref={parent}>
                                <Label className="block font-medium" required>Confirmar contraseña</Label>
                                <Input disabled={loading} appearance="underline" className="min-w-[300px]" required contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("confirmContrasenia")} />
                                {errors.confirmContrasenia && (
                                    <p className="text-sm text-red-600">{errors.confirmContrasenia.message}</p>
                                )}
                            </li>
                        </ul>
                    </div>
                    <Button type="submit" appearance="primary" disabled={loading}
                        icon={loading ? <SpinnerIos20Filled className="w-3 animate-spin" /> : <Checkmark20Filled />}>
                        {loading ? 'Espere...' : 'Actualizar'}
                    </Button>
                </Card>
            </form>
            <DialogConfirmContra abrir={loading}
                onConfirm={handleConfirm}
                onCancel={onCancel} />
        </article>
    )
}