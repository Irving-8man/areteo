import { guardarPantilla } from "@/utils/GuardarPlantilla";
import { Button } from "@fluentui/react-components";

export default function ButtonCrearPlantilla() {
    const handle = () =>{
        guardarPantilla()
        console.log("logrado")
    }
    return(
        <Button onClick={handle}>Crear plantilla</Button>
    )
}