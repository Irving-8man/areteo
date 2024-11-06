import { Input, Card, CardFooter, Button, InfoLabel, Label } from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaAdminLogin } from "@/schemas/formSchemaAdmin";
import { useSesion } from "@/hooks/useSesion";
import { AdminLogin } from "@/models/types";
import useRedirecSesion from "@/hooks/useRedirecSesion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PersonRegular, PasswordRegular } from "@fluentui/react-icons";
import { useState } from "react";


export default function Login() {
    //hooks
    const { login } = useSesion();
    useRedirecSesion();
    const [parent] = useAutoAnimate()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    // useForm con validacion de zod para formulario
    const Schema = formSchemaAdminLogin
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    });


    //procesar informacion de formulario
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataAdim: AdminLogin = (({ nombreUsuario, contrasenia }) => ({ nombreUsuario, contrasenia }))(data);
        setIsSubmitting(true);
        try {
            const isLogin = await login(dataAdim);
            if (isLogin) {
                reset();
                setIsSubmitting(false);
            } else {
                setIsSubmitting(false);
                alert("Error en las credenciales, intentelo de nuevo.");
            }
        } catch (error) {
            console.log("Error durante el registro:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Card style={{ padding: "40px" }} className="min-w-[450px]">
                <div>
                    <p className="text-center font-bold text-[20px] pb-[30px]">Iniciar sesión</p>
                </div>
                <div className="flex flex-col items-center gap-[25px]" ref={parent}>

                    <div className="flex-col">
                        <InfoLabel className="block font-medium">Usuario</InfoLabel>
                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PersonRegular />} placeholder="Fabian" {...register("nombreUsuario")} />
                        {errors.nombreUsuario && <p className="max-w-[25ch] text-sm">{errors.nombreUsuario.message}</p>}
                    </div>
                    <div>
                        <Label className="block font-medium" required>Contraseña</Label>
                        <Input disabled={isSubmitting} appearance="underline" className="min-w-[300px]" required contentBefore={<PasswordRegular />} placeholder="****" type="password" {...register("contrasenia")} />
                        {errors.contrasenia && <p className="max-w-[25ch] text-sm">{errors.contrasenia.message}</p>}
                    </div>
                </div>
                <CardFooter className="mt-[30px] flex justify-center">
                    <Button type="submit" appearance="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Espere...' : 'Acceder'}
                        </Button>
                </CardFooter>
            </Card>

        </form>
    )
}