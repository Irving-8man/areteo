import { AREASFIJAS } from "@/InstFijoDiabetes/Const";
import { Card } from "@fluentui/react-components"
import { Link } from "react-router-dom";
import {  PinGlobe20Filled } from "@fluentui/react-icons";

export default function ListaInstrumAnalitic() {
    return (
        <section className="min-h-[80vh]">
            <article className="mb-20">
                <Card style={{ padding: "25px" }}>
                    <h1 className="font-semibold text-2xl">Instrumentos con Datos Disponibles</h1>
                    <ul className="mt-6 flex flex-col gap-5">

                        {AREASFIJAS.map((area) => (
                            <li key={area.id}>
                                <Link to={`/dashboard/analiticas/${area.id}`} className="block hover:bg-zinc-200 hover:underline shadow-md">
                                    <Card style={{ padding: "15px",flexFlow:"row nowrap",  minWidth: "200px", backgroundColor: "transparent" }} className="flex gap-2" >
                                        <PinGlobe20Filled /> <p><span className="font-semibold">ACIC:</span> Área {area.id}-{area.nombre}</p>
                                    </Card>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </Card>
            </article>
        </section>
    )
}
