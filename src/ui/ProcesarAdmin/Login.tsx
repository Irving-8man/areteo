import { Link } from "react-router-dom";
import { Input, Card, CardFooter, Button, InfoLabel } from "@fluentui/react-components";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchemaAdminLogin } from "@/schemas/formSchemaAdmin";

// Tipos basados en el esquema de zod
type FormData = z.infer<typeof formSchemaAdminLogin>;
export default function Login() {
    // Inicializar el hook useForm con el resolver de zod
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchemaAdminLogin), // Usamos zodResolver para validar
    });

    const onSubmit = (data: FormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault(); // Evita el comportamiento predeterminado del formulario
        console.log("Datos enviados:", data); // Verifica qué datos se envían
    };

    return (
        <Card style={{ padding: "40px" }}>
            <div>
                <p className="text-center font-bold text-[20px] pb-[30px]">Iniciar sesión</p>
            </div>
            <div>
                <form className="flex flex-col items-center gap-[25px]" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-col">
                        <InfoLabel className="block">Usuario</InfoLabel>
                        <Input appearance="underline" {...register("username")} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div>
                        <InfoLabel className="block">Contraseña</InfoLabel>
                        <Input appearance="underline" type="password" {...register("constrasenia")} />
                        {errors.constrasenia && <p>{errors.constrasenia.message}</p>}
                    </div>

                    <Button appearance="primary" type="submit">Acceder</Button>
                </form>
            </div>
            <CardFooter className="mt-[30px]">
                <Link to="/dashboard">
                    <Button appearance="outline">Ir a Dashboard</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}