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
    Label,
    makeStyles,
} from "@fluentui/react-components";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchemaPacienteRegistro } from "@/schemas/formSchemaPacientes";
import { Paciente } from "@/models/types";
import { usePacienteStore } from "@/store/storePacientes";



const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function DialogRegiPaciente() {
    //hooks
    const styles = useStyles();
    const Schema = formSchemaPacienteRegistro
    const registrarPaciente = usePacienteStore((state) => state.registrarPaciente);


    // useForm con validacion de zod
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema), defaultValues: {
            primerNombre: "",
            segundoNombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            fechaNacimiento: ""
        },
    });



    // Procesar información
    const onSubmit = async (data: z.infer<typeof Schema>) => {
        const dataPaciente: Paciente = data;
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            await registrarPaciente(dataPaciente);
            console.log(dataPaciente)
            reset();
        } catch (error) {
            console.log("Error durante el registro:", error);
        }
    };

    return (
        <Dialog >
            <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary">Nuevo Paciente</Button>
            </DialogTrigger>
            <DialogSurface aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogBody>
                        <DialogTitle>Registrar Paciente</DialogTitle>
                        <DialogContent className={styles.content}>
                            <Label required htmlFor="primerNombre">
                                Primer Nombre
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Fabian"
                                {...register("primerNombre")}
                            />
                            {errors.primerNombre && (
                                <p className="max-w-[50ch] text-sm">{errors.primerNombre.message}</p>
                            )}


                            <Label htmlFor="segundoNombre">
                                Segundo Nombre (opcional)
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Andrés"
                                {...register("segundoNombre")}
                            />
                            {errors.segundoNombre && (
                                <p className="max-w-[50ch] text-sm">{errors.segundoNombre.message}</p>
                            )}

                            <Label required htmlFor="apellidoPaterno">
                                Apellido Paterno
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Pérez"
                                {...register("apellidoPaterno")}
                            />
                            {errors.apellidoPaterno && (
                                <p className="max-w-[50ch] text-sm">{errors.apellidoPaterno.message}</p>
                            )}

                            <Label htmlFor="apellidoMaterno">
                                Apellido Materno (opcional)
                            </Label>
                            <Input
                                appearance="underline"
                                placeholder="Ej. Gómez"
                                {...register("apellidoMaterno")}
                            />
                            {errors.apellidoMaterno && (
                                <p className="max-w-[50ch] text-sm">{errors.apellidoMaterno.message}</p>
                            )}

                            <Label required htmlFor="fechaNacimiento">
                                Fecha de Nacimiento
                            </Label>
                            <Input
                                appearance="underline"
                                type="date"
                                {...register("fechaNacimiento")}
                            />
                            {errors.fechaNacimiento && (
                                <p className="max-w-[25ch] text-sm">{errors.fechaNacimiento.message}</p>
                            )}


                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Cerrar</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary">
                                Crear
                            </Button>
                        </DialogActions>
                    </DialogBody>
                </form>
            </DialogSurface>
        </Dialog>
    );
}