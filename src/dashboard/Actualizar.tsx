import { Input, Card, CardFooter, Button, InfoLabel } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { AdminActualizar } from "@/models/types";
import { actualizarAdmin, getAdmin } from "@/services/AdminController";
import { formSchemaActualizar } from "@/schemas/formSchemaAdmin";
import { z } from "zod";

export default function Actualizar() {
    const [adminData, setAdminData] = useState<AdminActualizar | null>(null);

    // Obtener datos del administrador al montar el componente
    const fetchAdmin = async () => {
        const admin = await getAdmin(); // Obtener admin desde la base de datos
        if (admin) {
            setAdminData(admin as AdminActualizar); // Forzamos el tipo a AdminActualizar
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    // Configuración de formulario con validación de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchemaActualizar>>({
        resolver: zodResolver(formSchemaActualizar),
        defaultValues: {
            nombreComple: "",
            nombreUsuario: "",
            contrasenia: ""
        }
    });

    // Actualizar datos de administrador
    const onSubmit = async (data: z.infer<typeof formSchemaActualizar>) => {
        if (adminData && adminData.id) {
            const updatedData = {
                id: adminData.id,
                nombreComple: data.nombreComple || adminData.nombreComple,
                nombreUsuario: data.nombreUsuario || adminData.nombreUsuario,
                contrasenia: data.contrasenia // Asumimos que se desea cambiar siempre la contraseña si se proporciona
            };

            const success = await actualizarAdmin(updatedData);
            if (success) {
                alert("Datos actualizados correctamente");
                fetchAdmin(); // Refrescar los datos después de la actualización
            } else {
                alert("Error al actualizar los datos");
            }
        } else {
            alert("No se pudo obtener la información del administrador.");
        }
    };

    // Resetear valores cuando adminData cambie
    useEffect(() => {
        if (adminData) {
            reset({
                nombreComple: adminData.nombreComple,
                nombreUsuario: adminData.nombreUsuario,
                contrasenia: ""
            });
        }
    }, [adminData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card style={{ padding: "40px" }} className="min-w-[450px]">
                <div>
                    <p className="text-center font-bold text-[20px] pb-[30px]"> Datos del Administrador</p>
                </div>
                <div className="flex flex-col items-center gap-[25px]">
                    <div className="flex-col">
                        <InfoLabel className="block">Nombre de usuario</InfoLabel>
                        <Input appearance="underline" placeholder="Nombre de usuario" {...register("nombreUsuario")} />
                        {errors.nombreUsuario && <p>{errors.nombreUsuario.message}</p>}
                    </div>
                    <div className="flex-col">
                        <InfoLabel className="block">Nombre completo</InfoLabel>
                        <Input appearance="underline" placeholder="Nombre completo" {...register("nombreComple")} />
                        {errors.nombreComple && <p>{errors.nombreComple.message}</p>}
                    </div>
                    <div>
                        <InfoLabel className="block">Contraseña</InfoLabel>
                        <Input appearance="underline" placeholder="Nueva contraseña" type="password" {...register("contrasenia")} />
                        {errors.contrasenia && <p>{errors.contrasenia.message}</p>}
                    </div>
                </div>
                <CardFooter className="mt-[30px] flex justify-center">
                    <Button appearance="primary" type="submit" onClick={fetchAdmin} >Actualizar</Button>
                </CardFooter>
            </Card>
        </form>
    );
}