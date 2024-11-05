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
import { ResEvalACICList } from "@/models/typesFijo";
import { format } from "@formkit/tempo";
import { Link } from "react-router-dom";



const CopyEye = bundleIcon(EyeFilled, EyeRegular);


interface RowProps {
    ResEvalACIC: ResEvalACICList;
    borrarResEval: (id: string) => void
    num: number;
}


export default function ItemEvalACICList(props: RowProps) {
    const { ResEvalACIC, borrarResEval, num } = props
    return (
        <tr className={`w-full border-b text-sm ${num % 2 === 0 ? "bg-gray-200" : ""}`}>
            <td className="whitespace-nowrap py-3 pl-3">
                <Link to={`/dashboard/instrumentos/instrumentoFijo/resultados/${String(ResEvalACIC.area_id)}/${String(ResEvalACIC.id)}`} className="hover:underline">
                    <span>{format(ResEvalACIC.fechaEvaluacion, { date: "medium", time: "short" })}</span>
                </Link>
            </td>
            <td className="whitespace-nowrap py-3 pl-3">{parseFloat(ResEvalACIC.promedio!.toFixed(2))}</td>
            <td className="py-3 pl-3"><p className="max-w-[28ch]">{ResEvalACIC.evaluacionDicha}</p></td>
            <td className="py-3 pl-3"><p className="max-w-[25ch]">{ResEvalACIC.aplicador}</p></td>
            <td className="py-3 pl-3"><p className="max-w-[25ch]">{ResEvalACIC.respondiente}</p></td>
            <td className="whitespace-nowrap px-3 py-3">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={<MoreVerticalFilled />}></Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem>
                                <Button icon={<CopyEye />} onClick={() => borrarResEval(ResEvalACIC.id)}>Ver Respuestas</Button>
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}