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
    useRedirecSesion();
    const [parent] = useAutoAnimate()

    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            nombreComple: "",
            nombreUsuario: "",
            contrasenia: "",
            confirmContrasenia: ""
        },
    });


    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataAdim: Admin = (({ nombreComple, nombreUsuario, contrasenia }) => ({ nombreComple, nombreUsuario, contrasenia }))(data);
        try {
            // Aquí llamas a registrarAdmin solo para hacer una verificación
            const isRegistrado = await registrarAdmin(dataAdim);

            if (isRegistrado) {
                console.log("Registro completado");
                navigate("/dashboard")
            } else {
                console.log("El administrador no se registró.");
            }
        } catch (error) {
            console.log("Error durante el registro:", error);
        }
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className={`min-w-[450px] ${styles.card}`}>
                <header>
                    <p className="text-center font-bold text-xl pb-[30px]">Registro de Administrador</p>
                </header>
                <div className="flex flex-col items-center gap-[25px]" ref={parent}>

                    <div>
                        <p className="font-semibold">Ingrese los siguientes datos: </p>
                    </div>
                    <div className="flex-col">
                        <Label className="block">Nombre de Usuario</Label>
                        <Input appearance="underline" contentBefore={<PersonRegular />} placeholder="Fabian Pérez" {...register("nombreUsuario")} />
                        {errors.nombreUsuario && <p className="max-w-[25ch] text-sm">{errors.nombreUsuario.message}</p>}
                    </div>
                    <div className="flex-col">
                        <Label className="block">Nombre Completo</Label>
                        <Input appearance="underline" contentBefore={<PersonRegular />} placeholder="Fabian Alejandro Pérez Gómez" {...register("nombreComple")} />
                        {errors.nombreComple && <p className="max-w-[25ch] text-sm">{errors.nombreComple.message}</p>}
                    </div>
                    <div>
                        <Label className="block">Contraseña</Label>
                        <Input appearance="underline" contentBefore={<PasswordRegular />} placeholder="********" type="password" {...register("contrasenia")} />
                        {errors.contrasenia && <p className="max-w-[25ch] text-sm">{errors.contrasenia.message}</p>}
                    </div>

                    <div>
                        <Label className="block">Confirmar contraseña</Label>
                        <Input appearance="underline" contentBefore={<PasswordRegular />} placeholder="********" type="password" {...register("confirmContrasenia")} />
                        {errors.confirmContrasenia && <p className="max-w-[25ch] text-sm">{errors.confirmContrasenia?.message}</p>}
                    </div>

                    <CardFooter>
                        <Button type="submit" appearance="primary">Registrar</Button>
                    </CardFooter>
                </div>
            </Card>
        </form>

    )
}