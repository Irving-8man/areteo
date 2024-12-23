import { useSesion } from "@/hooks/useSesion";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaActualizarNombres } from "@/schemas/formSchemaAdmin";
import { Button, Card, Input, Label } from "@fluentui/react-components";
import { Checkmark20Filled, SpinnerIos20Filled } from "@fluentui/react-icons";
import ActualizarContra from "@/ui/ProcesarAdmin/ActulizarContra";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Perfil() {
    // Estado local para capturar el nuevo nombre completo y sincronizarlo con `isAdmin.nombreCompleto`
    const { isAdmin, actualizarNombres } = useSesion();
    const [loading, setLoading] = useState<boolean>(false);
    const Schema = formSchemaActualizarNombres
    const [parent] = useAutoAnimate()

    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            nombreComple: isAdmin?.nombreComple,
            nombreUsuario: isAdmin?.nombreUsuario
        },
    });

    // Actualizar los valores cuando `paciente` cambie
    useEffect(() => {
        if (isAdmin) {
            reset({
                nombreComple: isAdmin?.nombreComple,
                nombreUsuario: isAdmin?.nombreUsuario
            });
        }
    }, [isAdmin, reset]);

    // Procesar información
    const onSubmitNombres = async (data: z.infer<typeof Schema>) => {
        try {
            setLoading(true);
            const res = await actualizarNombres(data.nombreUsuario, data.nombreComple);
            if (res) {
                setLoading(false);
                alert("Nombres actualizados.")
            } else {
                setLoading(false);
                alert("Ha fallado actulizar los nombres, intentelo de nuevo.")
            }
        } catch (error) {
            console.error('Error al actualizar los nombres:', error);
            alert('Hubo un problema al actualizar los nombres');
        }
    };



    return (
        <main className="relative">
            <div className="border min-h-[100vh] px-[30px] py-[30px]">

                <header>
                    <h1 className="font-bold text-3xl">Mi perfil</h1>
                </header>

                <section className="flex flex-col mt-20 gap-20">
                    <article className="w-2/3">
                        <form onSubmit={handleSubmit(onSubmitNombres)}>
                            <Card style={{ padding: "25px" }}>
                                <h2 className="font-bold text-xl text-zinc-600 mb-5">Actualizar Nombres</h2>
                                <div className="mb-5" >
                                    <ul className="flex flex-col gap-8">
                                        <li className="flex flex-col gap-2"  ref={parent}>
                                            <Label required htmlFor="primerNombre" className="font-semibold">
                                                Nombre de Usuario
                                            </Label>
                                            <Input
                                                appearance="underline"
                                                placeholder="Fabian"
                                                {...register("nombreUsuario")}
                                                disabled={loading}
                                                required
                                                defaultValue={isAdmin?.nombreUsuario}
                                            />
                                            {errors.nombreUsuario && (
                                                <p className="text-sm text-red-600">{errors.nombreUsuario.message}</p>
                                            )}
                                        </li>

                                        <li className="flex flex-col gap-2"  ref={parent}>
                                            <Label htmlFor="segundoNombre" required className="font-semibold">
                                                Nombre Completo
                                            </Label>
                                            <Input
                                                appearance="underline"
                                                placeholder="Fabian Alejandro Pérez Gómez"
                                                {...register("nombreComple")}
                                                disabled={loading}
                                                required
                                                defaultValue={isAdmin?.nombreComple}
                                            />
                                            {errors.nombreComple && (
                                                <p className="text-sm text-red-600">{errors.nombreComple.message}</p>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                                <Button type="submit" appearance="primary" disabled={loading}
                                    icon={loading ? <SpinnerIos20Filled className="w-3 animate-spin" /> : <Checkmark20Filled />}>
                                    {loading ? 'Espere...' : 'Actualizar Nombres'}
                                </Button>
                            </Card>
                        </form>
                    </article>

                    <ActualizarContra />
                </section>
                        
            </div>
        </main>
    )
}