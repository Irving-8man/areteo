import { PacienteRegistrado } from "@/models/types";
import { getAllPacientesRegistrados } from "@/services/PacienteController";
import { Button } from "@fluentui/react-components";
import { useEffect, useState } from "react";


export default function ButtoCsv(){
    const [pacientesCarga, setPacientesCarga] = useState<PacienteRegistrado[]>([]);
    // Cada vez que cambian los searchParams, se ejecuta la búsqueda
    useEffect(() => {
        const fetchData = async () => {
            const pacientes = await getAllPacientesRegistrados()
            setPacientesCarga(pacientes);
            console.log(pacientes)
        };
        fetchData();
    }, []);

    function crearCSV(){
        
    }

    return(
        <Button onClick={crearCSV}>guardar csv </Button>
    )
}   