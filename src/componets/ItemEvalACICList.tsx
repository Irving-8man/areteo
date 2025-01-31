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
import { ResEvalACICList } from "@/models/typesFijo";
import { format } from "@formkit/tempo";
import { Link, useNavigate } from "react-router-dom";
import { generarDocxRegEvalPost } from "@/Docx/FucGenRegEvalPost";

const CopyEye = bundleIcon(EyeFilled, EyeRegular);


interface RowProps {
    ResEvalACIC: ResEvalACICList;
    num: number;
    designado: number;
}


export function ItemEvalACICList(props: RowProps) {
    const navigate = useNavigate();
    const { ResEvalACIC, num, designado } = props


    return (
        <tr className={`w-full border-b text-sm ${num % 2 === 0 ? "bg-zinc-100" : ""}`}>
            <td className="whitespace-nowrap py-3 pl-5"><span className="font-semibold">({designado})</span></td>
            <td className="whitespace-nowrap py-3 pl-3">
                <Link to={`/dashboard/instrumentos/instrumentoFijo/resultados/${String(ResEvalACIC.area_id)}/${String(ResEvalACIC.id)}`} className="underline">
                    <span>{format(ResEvalACIC.fechaEvaluacion, { date: "medium", time: "short" })}</span>
                </Link>
            </td>
            <td className="whitespace-nowrap py-3 pl-3">{parseFloat(ResEvalACIC.promedio!.toFixed(2))}</td>
            <td className="py-3 pl-3"><p className="max-w-[28ch]">{ResEvalACIC.evaluacionDicha}</p></td>
            <td className="py-3 pl-3"><p className="max-w-[24ch]">{ResEvalACIC.respondiente}</p></td>
            <td className="py-3 pl-3"><p className="max-w-[24ch]">{ResEvalACIC.aplicador}</p></td>
            <td className="whitespace-nowrap px-3 py-5">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={<MoreVerticalFilled />}></Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem className="font-semibold" icon={<CopyEye />} onClick={() => { navigate(`/dashboard/instrumentos/instrumentoFijo/resultados/${String(ResEvalACIC.area_id)}/${String(ResEvalACIC.id)}`) }}>
                                Ver Evaluación
                            </MenuItem>
                            <MenuItem className="font-semibold" icon={<ArrowDownload20Regular />} onClick={() =>{ generarDocxRegEvalPost(ResEvalACIC.id)}} >
                                Descargar Evaluación
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </td>
        </tr>
    )
}