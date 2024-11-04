import { Card } from "@fluentui/react-components"
import { ArrowRight20Filled, PinGlobe20Filled } from "@fluentui/react-icons";
import { Link } from "react-router-dom";



export default function ListaInstrumentos() {
    return (
        <section className="min-h-[80vh]">
            <article className="mb-20">
                <Card>
                    <h1 className="font-semibold text-2xl">Instrumento disponibles</h1>
                    <ul className="mt-6">
                        <li>
                            <Link to="/dashboard/instrumentos/instrumentoFijo" className="w-full border py-3 px-6 text-sm hover:bg-gray-200 flex gap-2 hover:underline">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex gap-2">
                                        <PinGlobe20Filled />
                                        <h2>Cuestionario Evaluación Atención en Diabetes ACIC 2004</h2>
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


            <article>
                <Card>
                    <article className="flex justify-center">
                        <p className="text-lg text-gray-700 max-w-[40ch] text-center">Muy pronto estaran disponibles funcionalidades para crear plantillas de instrumentos.</p>
                    </article>
                </Card>
            </article>
        </section>
    )
}
