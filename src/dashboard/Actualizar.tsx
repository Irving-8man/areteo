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
import { z } from "zod";

// Definición del esquema de validación con Zod
const formSchemaActualizar = z.object({
    nombreComple: z.string().min(1, { message: "El nombre completo es requerido." }),
    nombreUsuario: z.string().min(1, { message: "El nombre de usuario es requerido." }),
    contrasenia: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
    confirmarContrasenia: z.string().min(6, { message: "La confirmación de contraseña debe tener al menos 6 caracteres." }),
}).refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasenia"], // Se coloca la ruta de confirmación para mostrar el error en ese campo
});

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
    const [openDialogDatos, setOpenDialogDatos] = useState(false);
    const [openDialogContraseña, setOpenDialogContraseña] = useState(false);
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
            contrasenia: "",
            confirmarContrasenia: "",
        }
    });

    // Actualizar datos de administrador
    const onSubmit = async (data: z.infer<typeof formSchemaActualizar>) => {
        if (adminData && adminData.id) {
            const updatedData = {
                id: adminData.id,
                nombreComple: data.nombreComple || adminData.nombreComple,
                nombreUsuario: data.nombreUsuario || adminData.nombreUsuario,
                contrasenia: data.contrasenia,
            };

            const success = await actualizarAdmin(updatedData);
            if (success) {
                alert("Datos actualizados correctamente");
                fetchAdmin();
                setOpenDialogDatos(false);
                setOpenDialogContraseña(false); // Cerrar ambos diálogos
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
                contrasenia: "",
                confirmarContrasenia: "",
            });
        }
    }, [adminData, reset]);

    return (
        <>
            {/* Diálogo para actualizar datos */}
            <Dialog open={openDialogDatos} onOpenChange={(_, data) => setOpenDialogDatos(data.open)}>
                <DialogTrigger>
                    <Button appearance="primary">Actualizar Datos</Button>
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

            {/* Diálogo para actualizar contraseña */}
            <Dialog open={openDialogContraseña} onOpenChange={(_, data) => setOpenDialogContraseña(data.open)}>
                <DialogTrigger>
                    <Button appearance="primary">Actualizar Contraseña</Button>
                </DialogTrigger>
                <DialogSurface>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogBody>
                            <DialogTitle>Actualizar Contraseña</DialogTitle>
                            <DialogContent className={styles.content}>
                                <div className={styles.inputColumn}>
                                    <InfoLabel>Contraseña</InfoLabel>
                                    <Input
                                        appearance="underline"
                                        placeholder="Nueva contraseña"
                                        type="password"
                                        {...register("contrasenia")}
                                    />
                                    {errors.contrasenia && <p className="text-red-600">{errors.contrasenia.message}</p>}

                                    <InfoLabel>Confirmar Contraseña</InfoLabel>
                                    <Input
                                        appearance="underline"
                                        placeholder="Confirmar contraseña"
                                        type="password"
                                        {...register("confirmarContrasenia")}
                                    />
                                    {errors.confirmarContrasenia && (
                                        <p className="text-red-600">{errors.confirmarContrasenia.message}</p>
                                    )}
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
