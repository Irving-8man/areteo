import { Input, Card, CardFooter, Label, makeStyles, Button } from "@fluentui/react-components";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaAdminRegistro } from "@/schemas/formSchemaAdmin";
import { useNavigate } from 'react-router-dom';
//import { useState } from "react";
import { PersonRegular, } from "@fluentui/react-icons";

const useStyles = makeStyles({
    card: {
        padding: "50px"
    },
});

export default function RegistrarAdmin() {
    //Hooks
    const navigate = useNavigate();
    const styles = useStyles();
   // const [loading, setLoading] = useState<boolean>(false);
    const Schema = formSchemaAdminRegistro


    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    });


    //Procesar informacion
    const onSubmit = (data: z.infer<typeof Schema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        console.log("Datos enviados:", data);
        setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Card className={`min-w-[400px] ${styles.card}`}>
                <header>
                    <p className="text-center font-bold text-[20px] pb-[30px]">Iniciar sesión</p>
                </header>
                <div className="flex flex-col items-center gap-[25px]">

                    <div className="flex-col">
                        <Label className="block">Usuario</Label>
                        <Input appearance="underline" contentBefore={<PersonRegular />} {...register("username")} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div>
                        <Label className="block">Contraseña</Label>
                        <Input appearance="underline" type="password" {...register("constrasenia")} />
                        {errors.constrasenia && <p>{errors.constrasenia.message}</p>}
                    </div>
                    <CardFooter>
                        <Button type="submit" appearance="primary">Registrar</Button>
                    </CardFooter>
                </div>
            </Card>
        </form>

    )
}