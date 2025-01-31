import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
} from "@fluentui/react-components";

import {
    ArrowDownload20Regular,
    bundleIcon,
    EyeFilled,
    EyeRegular,
    MoreVerticalFilled
} from "@fluentui/react-icons";
import { RegistroMedicoList } from "@/models/types";
import { format } from "@formkit/tempo";
import { Link, useNavigate } from "react-router-dom";
import { generarDocxRegistroMedico } from "@/Docx/DatosPaciente/FucGenRegistroMedico";


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
    const navigate = useNavigate();

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
            <td className="whitespace-nowrap px-3 py-3">{registro.peso} kg</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.antecedFamiInfa}</td>
            <td className="whitespace-nowrap px-3 py-3"> <p> <span> {tratamientos[0]}</span> | <span> {tratamientos[1]}</span></p></td>
            <td className="whitespace-nowrap px-3 py-3">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={<MoreVerticalFilled />}></Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem icon={<CopyEye />} onClick={() => { navigate(`/dashboard/pacientes/${props.paciente_id}/result-registro/${props.registro.id}`) }}>
                                Ver Registro
                            </MenuItem>
                            <MenuItem icon={<ArrowDownload20Regular />} onClick={() => { generarDocxRegistroMedico(props.paciente_id, props.registro.id) }} >
                                Descargar Registro
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}