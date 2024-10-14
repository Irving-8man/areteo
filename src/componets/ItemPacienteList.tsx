import { PacienteRegistrado } from "@/models/types"
import { AvatarPaciente } from "./AvatarPaciente";
import { calcularEdad } from "@/utils/CalcularEdad";
import { format } from "@formkit/tempo";
import { Button } from '@fluentui/react-components';
import { usePacienteStore } from "@/store/storePacientes";

interface propsI{
    paciente:PacienteRegistrado;
}

export default function ItemPacienteList(props:propsI) {
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente);

    return (
        <tr
            key={props.paciente.id}
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
        >
            <td className="whitespace-nowrap py-3 pl-6 pr-3 flex flex-row gap-[5px]">
                <AvatarPaciente
                    edad={calcularEdad(props.paciente.fechaNacimiento)}
                    label={`${props.paciente.primerNombre} ${props.paciente.apellidoPaterno}`}
                    name={`${props.paciente.primerNombre} ${props.paciente.apellidoPaterno}`}
                />
                <div className="flex items-center gap-3">
                    <p>{props.paciente.primerNombre} {props.paciente.segundoNombre} {props.paciente.apellidoPaterno} {props.paciente.apellidoMaterno}</p>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p><span>{calcularEdad(props.paciente.fechaNacimiento)}</span> años</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{format(new Date(props.paciente.fechaNacimiento),"short")}</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{format(new Date(props.paciente.fechaRegistro), "short")}</p>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <Button className="bg-red-400" onClick={()=>eliminarPaciente(props.paciente.id)}>Borrar</Button>
                    <Button>Historial</Button>
                </div>
            </td>
        </tr>
    );
}