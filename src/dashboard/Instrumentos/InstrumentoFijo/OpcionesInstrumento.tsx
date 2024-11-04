//import { Button } from "@fluentui/react-components";
import { Accordion, AccordionItem, Button, Card, AccordionHeader, AccordionPanel } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { ArrowLeft20Filled, Pin20Filled } from "@fluentui/react-icons";


const AREASFIJAS = [
    { id: 1, nombre: "Área 1: Organización del Sistema de Salud" },
    { id: 2, nombre: "Área 2: Provisión de Servicios de Salud" },
    { id: 3, nombre: "Área 3: Atención a Enfermedades Crónicas" },
    { id: 4, nombre: "Área 4: Evaluación del Paciente" },
    { id: 5, nombre: "Área 5: Gestión de Medicamentos" },
    { id: 6, nombre: "Área 6: Gestión de Personal de Salud" }
];

const INFORMACION = [
    { id: 1, nombre: "1. Organización del Sistema de Salud", descripcion: "Los sistemas de atención de salud pueden crear un ambiente en el cual los esfuerzos organizados para mejorar la atención de salud a la diabetes se afianzan y prosperan. Los elementos críticos incluyen un enfoque coherente a la mejoría del sistema, al liderazgo comprometido con los responsables de la mejoría de los resultados clínicos, y a los incentivos a los proveedores y a los pacientes para mejorar la atención y adherirse a las normas/guías clínicas (incluidos incentivos no financieros tales como reconocimiento y estatus)." },
    { id: 2, nombre: "2. Recursos de la Comunidad", descripcion: "Los sistemas de atención de salud pueden mejorarse utilizando los recursos de la comunidad que sean relevantes a la atención eficaz de la diabetes. Los recursos de la comunidad que apoyan el cuidado para la diabetes, incluidos tanto programas gubernamentales como de programas de organizaciones voluntarias comunitarias, se necesitan para aumentar los servicios de atención de salud, pero las organizaciones de atención de salud son a menudo mal organizadas para hacer uso de los programas existentes de la comunidad o para estimular su desarrollo." },
    { id: 3, nombre: "3. Auto cuidado del paciente con Diabetes Mellitus", descripcion: "Apoyo al uso eficaz de auto cuidado ayuda a los pacientes y a sus familias a que hagan frente a los retos de vivir con la enfermedad y cuidar las afecciones crónicas para reducir al mínimo las complicaciones, los síntomas y las incapacidades. El éxito de los programas de auto cuidado depende de la colaboración entre los pacientes y los proveedores de salud para definir los problemas, establecer la escala de prioridades, determinar las metas, crear planes de tratamiento y resolver los problemas a lo largo del camino. La disponibilidad de conocimientos educativos basados en evidencias que adiestren e intervenciones de apoyo psicológico social son los componentes claves de la estructura de un sistema de auto cuidado." },
    { id: 4, nombre: "4. Normas de atención de la Diabetes Mellitus", descripcion: "Programas efectivos de atención a la diabetes operan de acuerdo con guías o protocolos específicos, preferentemente aquellas guías basadas en evidencias y cuya implementación está envuelta en prácticas rutinarias ligadas por recordatorios, educadores efectivos, e información apropiada, y la colaboración y el soporte de área de las especialidades médicas relevantes." },
    { id: 5, nombre: "5. Apoyo técnico", descripcion: "Un cuidado efectivo de atención a la diabetes requiere más que simplemente agregar intervenciones a un sistema existente centrado en cuidados médicos agudos. Más bien, requiere de cambios básicos en la infraestructura del sistema de salud. La atención eficaz de diabetes a veces requiere una delegación clara de las funciones y responsabilidades del médico a otros profesionales quienes son parte del equipo de cuidado a la salud (por ejemplo: enfermeras, educadores de salud, etc.) y quienes tienen el conocimiento y el tiempo para llevar a cabo una variedad de tareas necesarias para manejar las complicaciones de la diabetes. El cuidado efectivo de diabetes también implica el uso de las visitas planificadas, el cuidado continuo y el seguimiento regular." },
    { id: 6, nombre: "6. Sistema de información de la Diabetes Mellitus", descripcion: "Información a tiempo sobre los pacientes individuales y sobre la población de pacientes con diabetes es una característica crítica de los programas efectivos, especialmente aquellos que emplean enfoques basados en la población. El primer paso es establecer un registro de enfermedades para las prácticas individuales, que incluyan información de elementos de atención. Equipo de salud que tienen acceso a un registro, pueden localizar pacientes con necesidades específicas y entregarles una atención planificada, pueden recibir retroalimentación sobre su desempeño y pueden implementar sistemas de recordatorio." }
]

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

            <section className="mt-10">
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

            <section className="mt-10">
                <h3 className="font-semibold text-lg mb-5"> <Pin20Filled /> Áreas disponibles</h3>
                <ul className="grid grid-cols-3 gap-10">
                    {AREASFIJAS.map((area) => (
                        <li key={area.id}>
                            <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${area.id}`} className="block hover:bg-zinc-200 hover:underline">
                                <Card style={{ padding: "35px", backgroundColor: "transparent" }} >
                                    {area.nombre}
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-12">
                <h3 className="font-semibold text-lg mb-5">Descripción de las áreas del modelo de la atención a la diabetes</h3>

                <Accordion collapsible style={{ display: "flex", flexFlow: "column nowrap", gap: "15px" }}>
                    {INFORMACION.map(({ id, nombre, descripcion }) => (
                        <AccordionItem value={id} key={id}>
                            <AccordionHeader><span className="font-semibold text-lg">{nombre}</span></AccordionHeader>
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