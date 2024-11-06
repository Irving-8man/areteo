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
    InfoLabel,
    makeStyles,
} from "@fluentui/react-components";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { AdminActualizar } from "@/models/types";
import { actualizarAdmin, getAdmin } from "@/services/AdminController";
import { formSchemaActualizar } from "@/schemas/formSchemaAdmin";
import { z } from "zod";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
    },
    inputColumn: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
});

export default function Actualizar() {
    const [adminData, setAdminData] = useState<AdminActualizar | null>(null);
    const [open, setOpen] = useState(false);
    const styles = useStyles();

    // Obtener datos del administrador al montar el componente
    const fetchAdmin = async () => {
        const admin = await getAdmin();
        if (admin) {
            setAdminData(admin as AdminActualizar);
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
                contrasenia: data.contrasenia
            };

            const success = await actualizarAdmin(updatedData);
            if (success) {
                alert("Datos actualizados correctamente");
                fetchAdmin();
                setOpen(false);
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
        <>
            <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
                <DialogTrigger>
                    <Button appearance="primary">Actualizar Datos de Administrador</Button>
                </DialogTrigger>
                <DialogSurface>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogBody>
                            <DialogTitle>Actualizar Datos</DialogTitle>
                            <DialogContent className={styles.content}>
                                <div className={styles.inputColumn}>
                                    <InfoLabel>Nombre de usuario</InfoLabel>
                                    <Input
                                        appearance="underline"
                                        placeholder="Nombre de usuario"
                                        {...register("nombreUsuario")}
                                    />
                                    {errors.nombreUsuario && <p className="text-red-600">{errors.nombreUsuario.message}</p>}

                                    <InfoLabel>Nombre completo</InfoLabel>
                                    <Input
                                        appearance="underline"
                                        placeholder="Nombre completo"
                                        {...register("nombreComple")}
                                    />
                                    {errors.nombreComple && <p className="text-red-600">{errors.nombreComple.message}</p>}

                                    <InfoLabel>Contraseña</InfoLabel>
                                    <Input
                                        appearance="underline"
                                        placeholder="Nueva contraseña"
                                        type="password"
                                        {...register("contrasenia")}
                                    />
                                    {errors.contrasenia && <p className="text-red-600">{errors.contrasenia.message}</p>}
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger>
                                    <Button appearance="secondary">Cancelar</Button>
                                </DialogTrigger>
                                <Button appearance="primary" type="submit">Actualizar</Button>
                            </DialogActions>
                        </DialogBody>
                    </form>
                </DialogSurface>
            </Dialog>
        </>
    );
}
