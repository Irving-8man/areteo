import { Input, Card, CardFooter, Button, InfoLabel } from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaAdminLogin } from "@/schemas/formSchemaAdmin";
import { useSesion } from "@/hooks/useSesion";
import { Admin } from "@/models/types";
import useRedirecSesion from "@/hooks/useRedirecSesion";



export default function Login() {
    //hooks
    const {login} = useSesion();
    useRedirecSesion();

    // useForm con validacion de zod para formulario
    const Schema = formSchemaAdminLogin
    const { register, handleSubmit, formState: { errors }, } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            nombre: "",
            contrasenia: "",
        },
    });


    //procesar informacion de formulario
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataAdim: Admin = (({ nombre, contrasenia }) => ({ nombre, contrasenia }))(data);
        try {        
            const isLogin = await login(dataAdim);
            if (isLogin) {
                console.log("Bienvenido");
            } else {
                console.log("Fallo en las credenciales.");
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
                <div className="flex flex-col items-center gap-[25px]">

                    <div className="flex-col">
                        <InfoLabel className="block">Usuario</InfoLabel>
                        <Input appearance="underline" {...register("nombre")} />
                        {errors.nombre && <p>{errors.nombre.message}</p>}
                    </div>
                    <div>
                        <InfoLabel className="block">Contraseña</InfoLabel>
                        <Input appearance="underline" type="password" {...register("contrasenia")} />
                        {errors.contrasenia && <p>{errors.contrasenia.message}</p>}
                    </div>
                </div>
                <CardFooter className="mt-[30px] flex justify-center">
                    <Button appearance="primary" type="submit">Acceder</Button>
                </CardFooter>
            </Card>

        </form>
    )
}