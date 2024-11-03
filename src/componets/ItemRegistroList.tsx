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
    CutRegular,
    CutFilled,
    CopyRegular,
    CopyFilled,
} from "@fluentui/react-icons";
import { RegistroMedicoList } from "@/models/types";
import { format } from "@formkit/tempo";
import ButtonDocxRegistro from "@/Docx/DatosPaciente/ButtonDocxRegistro";


const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);

interface RowProps {
    registro: RegistroMedicoList;
    paciente_id: string;
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
        <tr className='w-full border-b text-sm hover:bg-gray-200'>
            <td className="whitespace-nowrap py-3 pl-6">{format(registro.fechaDiagnostico, "short")}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.edadDicha}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.peso}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.antecedFamiInfa}</td>
            <td className="whitespace-nowrap px-3 py-3"> <p> <span> {tratamientos[0]}</span> | <span> {tratamientos[1]}</span></p></td>
            <td className="whitespace-nowrap px-3 py-3">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button>Edit</Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem
                                icon={<CutIcon />}
                                onClick={() => alert("Cut to clipboard")}
                            >
                                Cut
                            </MenuItem>
                            <MenuItem
                                icon={<CopyIcon />}
                                onClick={() => alert("Copied to clipboard")}
                            >
                                Copy
                            </MenuItem>
                            <MenuItem

                            >
                                <ButtonDocxRegistro paciente_id={props.paciente_id} registro_id={props.registro.id} />
                            </MenuItem>

                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}