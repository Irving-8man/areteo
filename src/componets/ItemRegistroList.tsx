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
    ClipboardPasteRegular,
    ClipboardPasteFilled,
    CutRegular,
    CutFilled,
    CopyRegular,
    CopyFilled,
} from "@fluentui/react-icons";
import { RegistroMedicoList } from "@/models/types";
import { format } from "@formkit/tempo";

const PasteIcon = bundleIcon(ClipboardPasteFilled, ClipboardPasteRegular);
const CopyIcon = bundleIcon(CopyFilled, CopyRegular);
const CutIcon = bundleIcon(CutFilled, CutRegular);

interface RowProps {
    registro: RegistroMedicoList;
}

export default function ItemRegistroList(props: RowProps) {
    const registro = props.registro;
    return (
        <tr className='w-full border-b text-sm hover:bg-gray-200'>
            <td className="whitespace-nowrap py-3 pl-6">{format(registro.fechaDiagnostico,"short")}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.edad}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.peso}</td>
            <td className="whitespace-nowrap px-3 py-3">{registro.antecedFamiInfa}</td>
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
                                icon={<PasteIcon />}
                                onClick={() => alert("Pasted from clipboard")}
                            >
                                Paste
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}