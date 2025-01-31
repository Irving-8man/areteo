//import { Button } from "@fluentui/react-components";
import { Accordion, AccordionItem, Button, Card, AccordionHeader, AccordionPanel } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { ArrowLeft20Filled, Pin20Filled } from "@fluentui/react-icons";
import { AREASFIJAS, INFORMACIONAREAS, CRITERIOS } from "@/InstFijoDiabetes/Const";



export default function OpcionesInstrumento() {
    return (
        <>
            <div className="flex justify-start">
                <Link to="/dashboard/instrumentos"><Button icon={<ArrowLeft20Filled />}>Instrumentos</Button></Link>
            </div>
            <section className="mt-6">
                <h1 className="font-bold text-2xl">Cuestionario Evaluación Atención en Diabetes ACIC 2004</h1>
                <h2 className="font-semibold text-xl">Assessment of Chronic Illness Care (ACIC)</h2>
            </section>

            <section className="mt-6">
                <h3 className="font-semibold text-lg">Explicación para completar el cuestionario</h3>
                <p className="text-base leading-relaxed max-w-[100ch]">
                    Este cuestionario debe de ser llenado por un equipo de trabajadores de la salud que incluya por
                    lo menos representantes de tres servicios de salud. Ej. Laboratorio, nutrición, trabajador social,
                    psicólogo, medico, enfermera, etc. Cada área cuenta con un número de componentes.  Cada
                    componente debe de ser leído y analizado por el equipo a fin de lograr una respuesta de
                    consenso.  Cada componente cuenta con 4 niveles: Nivel A corresponde al nivel ideal de la
                    atención. El Nivel D es el nivel en que los recursos para la atención de la diabetes no existen o
                    están muy limitados. Cada nivel tiene a su vez un rango que va de 0 a 11.  El mismo que
                    deberá ser marcado para reflejar la respuesta de consenso del grupo. Debe recordarse que solo
                    se marcara un valor por componente en el nivel seleccionado.
                </p>
            </section>

            <section className="my-20">
                <h3 className="font-semibold text-lg">Criterios por promedio en respuestas</h3>
                <ul className="grid grid-cols-3 gap-4 list-disc pl-4 mt-2">
                    {CRITERIOS.map((criterio, idx) => (
                        <li key={idx}>
                            <div>
                                <p className="font-semibold text-base">{criterio.rango}</p>
                                <p className="text-base">{criterio.descripcion}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-10">
                <h3 className="font-semibold text-lg mb-5"> <Pin20Filled /> Áreas disponibles</h3>
                <ul className="grid grid-cols-3 gap-10">
                    {AREASFIJAS.map((area) => (
                        <li key={area.id}>
                            <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${area.id}`} className="block hover:bg-zinc-200 hover:underline shadow-md">
                                <Card style={{ padding: "20px", minWidth: "200px", minHeight: "110px", backgroundColor: "transparent" }} className="flex flex-col justify-center" >
                                    <p><span className="font-semibold">Área {area.id}:</span> {area.nombre}</p>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-12">
                <h3 className="font-semibold text-lg mb-5">Descripción de las áreas del modelo de la atención a la diabetes</h3>

                <Accordion collapsible style={{ display: "flex", flexFlow: "column nowrap", gap: "15px" }}>
                    {INFORMACIONAREAS.map(({ id, nombre, descripcion }) => (
                        <AccordionItem value={id} key={id}>
                            <AccordionHeader><p className="font-semibold text-lg"><span>{id}</span>. <span>{nombre}</span></p></AccordionHeader>
                            <AccordionPanel>
                                <p className="text-[15px] leading-relaxed max-w-[100ch]">{descripcion}</p>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </>

    )
}