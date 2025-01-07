import { Input, Card, CardFooter, Label, makeStyles, Button } from "@fluentui/react-components";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaAdminRegistro } from "@/schemas/formSchemaAdmin";
import { PersonRegular, PasswordRegular } from "@fluentui/react-icons";
import { registrarAdmin } from "@/services/AdminController";
import { Admin } from "@/models/types";
import { useNavigate } from "react-router-dom";
import useRedirecSesion from "@/hooks/useRedirecSesion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";


const useStyles = makeStyles({
    card: {
        padding: "50px"
    },
});

export default function RegistrarAdmin() {
    //Hooks
    const navigate = useNavigate();
    const styles = useStyles();
    const Schema = formSchemaAdminRegistro
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    useRedirecSesion();
    const [parent] = useAutoAnimate()

    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    });


    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataAdim: Admin = (({ nombreComple, nombreUsuario, contrasenia }) => ({ nombreComple, nombreUsuario, contrasenia }))(data);
        setIsSubmitting(true);
        try {
            // Aquí llamas a registrarAdmin solo para hacer una verificación
            const isRegistrado = await registrarAdmin(dataAdim);

            if (isRegistrado) {
                reset();
                alert("Administrador registrado");
                setIsSubmitting(false);
                navigate("/dashboard");
            } else {
                setIsSubmitting(false);
                alert("El Administrador ha fallado en registrarse, intentelo de nuevo.");
            }
        } catch (error) {
            setIsSubmitting(false);
            alert("");
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className={`min-w-[500px] ${styles.card}`}>
                <header>
                    <p className="text-center font-bold text-xl pb-[30px]">Registro de Administrador</p>
                </header>
                <div className="flex flex-col items-center gap-[27px]" ref={parent}>

                    <div>
                        <p className="font-semibold text-gray-600">Ingrese los siguientes datos: </p>
                    </div>

                    <div className="flex-col">
                        <div className="mb-1">
                            <Label className="block font-medium" required>Nombre de Usuario</Label>
                            <strong className="text-gray-600 text-xs italic">Entre 3 y 60 caracteres, sin espacios.</strong>
                        </div>

                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PersonRegular />} placeholder="Fabian" {...register("nombreUsuario")} />
                        {errors.nombreUsuario && <p className="max-w-[25ch] text-sm">{errors.nombreUsuario.message}</p>}
                    </div>

                    <div className="flex-col">
                        <div className="mb-1">
                            <Label className="block font-medium" required>Nombre Completo</Label>
                            <strong className="text-gray-600 text-xs italic">Entre 3 y 60 caracteres.</strong>
                        </div>
                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PersonRegular />} placeholder="Fabian Alejandro Pérez Gómez" {...register("nombreComple")} />
                        {errors.nombreComple && <p className="max-w-[25ch] text-sm">{errors.nombreComple.message}</p>}
                    </div>

                    <div>
                        <div className="mb-1">
                            <Label className="block font-medium" required>Contraseña</Label>
                            <strong className="text-gray-600 text-xs italic">Entre 4 y 8 caracteres.</strong>
                        </div>
                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("contrasenia")} />
                        {errors.contrasenia && <p className="max-w-[25ch] text-sm">{errors.contrasenia.message}</p>}
                    </div>

                    <div>
                        <Label className="block font-medium" required>Confirmar Contraseña</Label>
                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("confirmContrasenia")} />
                        {errors.confirmContrasenia && <p className="max-w-[25ch] text-sm">{errors.confirmContrasenia?.message}</p>}
                    </div>

                    <CardFooter>

                        <Button type="submit" appearance="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Espere...' : 'Registrar'}
                        </Button>

                    </CardFooter>
                </div>
            </Card>
        </form>

    )
}