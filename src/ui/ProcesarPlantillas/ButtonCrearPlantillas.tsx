import { guardarPantilla } from "@/utils/GuardarPlantilla";
import { Button } from "@fluentui/react-components";

export default function ButtonCrearPlantilla({nombre = "default"}:{nombre:string | undefined}) {
    const handle = () =>{
        guardarPantilla(nombre)
        console.log("logrado")
    }
    return(
        <Button onClick={handle}>Crear plantilla</Button>
    )
}