import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
} from "@fluentui/react-components";

import {
    bundleIcon,
    EyeFilled,
    EyeRegular,
    MoreVerticalFilled
} from "@fluentui/react-icons";
import { RegistroMedicoList } from "@/models/types";
import { format } from "@formkit/tempo";
import ButtonDocxRegistro from "@/Docx/DatosPaciente/ButtonDocxRegistro";
import { Link } from "react-router-dom";


const CopyEye = bundleIcon(EyeFilled, EyeRegular);


interface RowProps {
    registro: RegistroMedicoList;
    paciente_id: string;
    num: number;
}

const CHECKS = {
    0: ["✅", "✅"],
    1: ["✅", "❌"],
    2: ["❌", "✅",],
    3: ["❌", "❌"],
}

export default function ItemRegistroList(props: RowProps) {
    const registro = props.registro;
    const usaTratamientoInyectable = registro.usaTratamientoInyectable === "true";
    const usaTratamientoOral = registro.usaTratamientoOral === "true";
    let tratamientos;

    if (usaTratamientoInyectable && usaTratamientoOral) {
        tratamientos = CHECKS[0];
    } else if (usaTratamientoInyectable) {
        tratamientos = CHECKS[1];
    } else if (usaTratamientoOral) {
        tratamientos = CHECKS[2];
    } else {
        tratamientos = CHECKS[3];
    }


    return (
        <tr className={`w-full border-b text-sm ${props.num % 2 === 0 ? "bg-zinc-200" : ""}`} >
            <td className="whitespace-nowrap py-3 pl-5">
                <span className="font-bold">{props.num + 1}.</span>
            </td>
            <td className="whitespace-nowrap py-3 pl-5">
                <Link to={`/dashboard/pacientes/${props.paciente_id}/result-registro/${props.registro.id}`} className="underline">
                    <span> {format(registro.fechaDiagnostico, { date: "medium", time: "short" })}</span>
                </Link>
            </td>
            <td className="whitespace-nowrap px-3 py-3">{registro.edadDicha}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.peso}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.antecedFamiInfa}</td>
            <td className="whitespace-nowrap px-3 py-3"> <p> <span> {tratamientos[0]}</span> | <span> {tratamientos[1]}</span></p></td>
            <td className="whitespace-nowrap px-3 py-3">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={<MoreVerticalFilled />}></Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem>
                                <Link to={`/dashboard/pacientes/${props.paciente_id}/result-registro/${props.registro.id}`}><Button icon={<CopyEye />}>Ver Registro</Button></Link>
                            </MenuItem>
                            <MenuItem>
                                <ButtonDocxRegistro paciente_id={props.paciente_id} registro_id={props.registro.id} />
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}