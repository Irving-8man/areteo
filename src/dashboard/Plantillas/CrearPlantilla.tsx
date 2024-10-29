import {
    Input,
    Label,
    useId,
    useToastController,
    Toast,
    ToastTitle,
    ToastTrigger,
    Link,
    Textarea,
} from "@fluentui/react-components";


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Plantilla } from "@/models/types";
import { useState } from "react";
import { formSchemaPlantilla } from "@/schemas/formSchemaPlantilla";
import { crearPlantilla } from "@/services/PlantillasController";




export default function CrearPlantilla() {
    //hooks
    const Schema = formSchemaPlantilla
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
        },
    });



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataPlantilla: Plantilla = data;
        try {
            setLoading(true);
            const registrado = await crearPlantilla(dataPlantilla);
            if (registrado) {
                setLoading(false);
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
            <h1>Crear plantilla</h1>

            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-15">
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
                            style={{ height: "100px" }}
                            disabled={loading}
                            required
                        ></Textarea>
                        {errors.descripcion && (
                            <p className="text-sm text-red-600">{errors.descripcion.message}</p>
                        )}

                        <div className="border">
                            <div className="flex flex-col w-1/2">
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
                            </div>

                            <div className="flex flex-col w-1/2">
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
                            </div>
                        </div>

                    </div>
                </form>
            </section>
        </>
    )
}
