import { PlantillaListDB } from "@/models/types"
import { format } from "@formkit/tempo";
import {
    Button,
} from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { ArrowRight20Filled } from "@fluentui/react-icons";


interface propsI {
    plantilla: PlantillaListDB;
}

export default function ItemPlantilla(props: propsI) {

    return (
        <tr
            key={props.plantilla.id}
            className="w-full border py-3 text-sm 
                hover:bg-gray-200
            "
        >
            <td className="whitespace-nowrap py-3 pl-6 pr-3 flex flex-row gap-[5px]">
                <div className="flex items-center gap-3">
                    <Link to={`/dashboard/plantillas/${props.plantilla.id}`} className="hover:underline">
                        <p>{props.plantilla.nombre}</p>
                    </Link>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{props.plantilla.descripcion}</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{props.plantilla.autor}</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{props.plantilla.adaptacionPor}</p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p>{format(new Date(props.plantilla.fechaModific), "short")}</p>
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <div className="flex justify-end gap-3">
                    <Link to={`/dashboard/plantillas/${props.plantilla.id}`} ><Button icon={<ArrowRight20Filled />}></Button></Link>
                </div>
            </td>
        </tr>
    );
}