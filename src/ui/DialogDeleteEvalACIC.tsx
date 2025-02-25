import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    makeStyles
} from "@fluentui/react-components";

import { Dismiss20Filled, Dismiss24Regular, SpinnerIos20Filled, Delete20Regular } from "@fluentui/react-icons";
import { useState } from "react";


const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export default function DialogDeleteEvalACIC({ eliminar }: {  eliminar: () => Promise<void>; }) {
    //hooks
    const styles = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    
    const handleDelete = async () => {
        setLoading(true);
        try {
            await eliminar(); 
            setOpen(false); 
        } catch (error) {
            console.error('Error en la eliminación:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Dialog open={open} onOpenChange={(_event, data) => setOpen(data.open)}>
                <DialogTrigger disableButtonEnhancement >
                    <Button style={{ "backgroundColor": "red", "color": "white" }} icon={<Delete20Regular />}>Eliminar Evaluación</Button>
                </DialogTrigger>
                <DialogSurface aria-describedby={undefined}>
                
                        <DialogBody>
                            <DialogTitle
                                action={
                                    <DialogTrigger action="close">
                                        <Button
                                            appearance="subtle"
                                            aria-label="close"
                                            icon={<Dismiss24Regular />}
                                        />
                                    </DialogTrigger>
                                }
                            >
                                <span className="text-zinc-600">
                                    Eliminar Evaluación
                                </span>
                            </DialogTitle>
                            <DialogContent className={styles.content} >
                                <p className="text-base">Al eliminar este Registro  de Evaluación ACIC de su Área, se borraran todas las respuestas y este afectará a los datos del área. ¿Desea continuar?</p>
                            </DialogContent>

                            <DialogActions className="mt-4">
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary" disabled={loading} icon={<Dismiss20Filled />}>Cerrar</Button>
                                </DialogTrigger>
                                <Button onClick={handleDelete} style={{ "backgroundColor": "red", "color": "white" }}
                                    icon={loading ? <SpinnerIos20Filled className="w-3 animate-spin" /> : <Delete20Regular />}
                                >
                                    Confirmar
                                </Button>
                            </DialogActions>
                        </DialogBody>
                </DialogSurface>
            </Dialog>
        </>
    );
}