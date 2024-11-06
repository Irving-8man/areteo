import { PacienteRegistrado } from "@/models/types"
import { AvatarPaciente } from "./AvatarPaciente";
import { calcularEdad } from "@/utils/CalcularEdad";
import { format } from "@formkit/tempo";
import {
    Button,
} from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { ArrowRight20Filled } from "@fluentui/react-icons";


interface propsI {
    paciente: PacienteRegistrado;
    num: number
}

export default function ItemPacienteList(props: propsI) {

    return (
        <tr
            key={props.paciente.id}
            className={`w-full border py-3 text-sm 
                ${props.num % 2 === 0 ? "bg-zinc-200" : ""}
            `}
        >
            <td className="whitespace-nowrap py-3 pl-6 pr-3 flex flex-row items-center gap-[5px]">
                <p className="font-bold mr-2">{props.num + 1}.</p>
                <AvatarPaciente
                    edad={calcularEdad(props.paciente.fechaNacimiento).valor}
                    label={`${props.paciente.primerNombre} ${props.paciente.apellidoPaterno}`}
                    tamanio="35px"
                />
                <div className="flex items-center gap-3">
                    <Link to={`/dashboard/pacientes/${props.paciente.id}`} className="underline">
                        <p>{props.paciente.primerNombre} {props.paciente.segundoNombre} {props.paciente.apellidoPaterno} {props.paciente.apellidoMaterno}</p>
                    </Link>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p><span>{calcularEdad(props.paciente.fechaNacimiento).texto}</span></p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{format(new Date(props.paciente.fechaNacimiento), "short")}</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{format(new Date(props.paciente.fechaRegistro), "medium")}</p>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <Link to={`/dashboard/pacientes/${props.paciente.id}`} ><Button icon={<ArrowRight20Filled />}></Button></Link>
                </div>
            </td>
        </tr>
    );
}