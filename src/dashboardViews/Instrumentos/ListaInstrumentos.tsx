import { Card } from "@fluentui/react-components"
import { ArrowRight20Filled, PinGlobe20Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";



export default function ListaInstrumentos() {
    return (
        <section className="min-h-[80vh]">
            <article className="mb-20">
                <Card style={{padding:"25px"}}>
                    <h1 className="font-semibold text-2xl">Instrumento Disponibles</h1>
                    <ul className="mt-6">
                        <li>
                            <Link to="/dashboard/instrumentos/instrumentoFijo" className="w-full border py-6 px-6 text-sm hover:bg-gray-200 flex gap-2 hover:underline">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex gap-2">
                                        <PinGlobe20Filled />
                                        <h2 className="font-semibold">Cuestionario Evaluación Atención en Diabetes ACIC 2004</h2>
                                    </div>
                                    <div>
                                        <ArrowRight20Filled />
                                    </div>
                                </div>
                            </Link>

                        </li>
                    </ul>
                </Card>
            </article>
        </section>
    )
}
