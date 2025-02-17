import { AreaFija, InfoArea, QuestArea } from "@/models/typesFijo";
import { QuestArea1 } from "./ResArea1";
import { QuestArea2 } from "./ResArea2";
import { QuestArea3 } from "./ResArea3";
import { QuestArea4 } from "./ResArea4";
import { QuestArea5 } from "./ResArea5";
import { QuestArea6 } from "./ResArea6";


export const CRITERIOS = [
    {
        rango: "Promedio obtenido entre 0 - 2",
        descripcion: "Soporte limitado para el cuidado de enfermedades crónicas."
    },
    {
        rango: "Promedio obtenido entre 3 - 5",
        descripcion: "Soporte básico para el cuidado de enfermedades crónicas."
    },
    {
        rango: "Promedio obtenido entre 6 - 8",
        descripcion: "Soporte razonablemente bueno para el cuidado de enfermedades crónicas."
    },
    {
        rango: "Promedio obtenido entre 9 - 11",
        descripcion: "Soporte completamente desarrollado para el cuidado de enfermedades crónicas."
    }
]

export const AREASFIJAS: AreaFija[] = [
    { id: 1, nombre: "Organización del Sistema de Salud", numQ: 6 },
    { id: 2, nombre: "Cooperación Comunitaria", numQ: 3 },
    { id: 3, nombre: "Nivel de la práctica", numQ: 4 },
    { id: 4, nombre: "Normas de atención de la Diabetes Mellitus", numQ: 4 },
    { id: 5, nombre: "Apoyo técnico", numQ: 6 },
    { id: 6, nombre: "Sistema de Información de la Diabetes Mellitus", numQ: 5 }
];

export const INFORMACIONAREAS: InfoArea[] = [
    { id: 1, nombre: "Organización del Sistema de Salud", descripcion: "Los sistemas de atención de salud pueden crear un ambiente en el cual los esfuerzos organizados para mejorar la atención de salud a la diabetes se afianzan y prosperan. Los elementos críticos incluyen un enfoque coherente a la mejoría del sistema, al liderazgo comprometido con los responsables de la mejoría de los resultados clínicos, y a los incentivos a los proveedores y a los pacientes para mejorar la atención y adherirse a las normas/guías clínicas (incluidos incentivos no financieros tales como reconocimiento y estatus)." },
    { id: 2, nombre: "Recursos de la Comunidad", descripcion: "Los sistemas de atención de salud pueden mejorarse utilizando los recursos de la comunidad que sean relevantes a la atención eficaz de la diabetes. Los recursos de la comunidad que apoyan el cuidado para la diabetes, incluidos tanto programas gubernamentales como de programas de organizaciones voluntarias comunitarias, se necesitan para aumentar los servicios de atención de salud, pero las organizaciones de atención de salud son a menudo mal organizadas para hacer uso de los programas existentes de la comunidad o para estimular su desarrollo." },
    { id: 3, nombre: "Auto cuidado del paciente con Diabetes Mellitus", descripcion: "Apoyo al uso eficaz de auto cuidado ayuda a los pacientes y a sus familias a que hagan frente a los retos de vivir con la enfermedad y cuidar las afecciones crónicas para reducir al mínimo las complicaciones, los síntomas y las incapacidades. El éxito de los programas de auto cuidado depende de la colaboración entre los pacientes y los proveedores de salud para definir los problemas, establecer la escala de prioridades, determinar las metas, crear planes de tratamiento y resolver los problemas a lo largo del camino. La disponibilidad de conocimientos educativos basados en evidencias que adiestren e intervenciones de apoyo psicológico social son los componentes claves de la estructura de un sistema de auto cuidado." },
    { id: 4, nombre: "Normas de atención de la Diabetes Mellitus", descripcion: "Programas efectivos de atención a la diabetes operan de acuerdo con guías o protocolos específicos, preferentemente aquellas guías basadas en evidencias y cuya implementación está envuelta en prácticas rutinarias ligadas por recordatorios, educadores efectivos, e información apropiada, y la colaboración y el soporte de área de las especialidades médicas relevantes." },
    { id: 5, nombre: "Apoyo técnico", descripcion: "Un cuidado efectivo de atención a la diabetes requiere más que simplemente agregar intervenciones a un sistema existente centrado en cuidados médicos agudos. Más bien, requiere de cambios básicos en la infraestructura del sistema de salud. La atención eficaz de diabetes a veces requiere una delegación clara de las funciones y responsabilidades del médico a otros profesionales quienes son parte del equipo de cuidado a la salud (por ejemplo: enfermeras, educadores de salud, etc.) y quienes tienen el conocimiento y el tiempo para llevar acabo una variedad de tareas necesarias para manejar las complicaciones de la diabetes. El cuidado efectivo de diabetes también implica el uso de las visitas planificadas, el cuidado continuo y el seguimiento regular." },
    { id: 6, nombre: "Sistema de información de la Diabetes Mellitus", descripcion: "Información a tiempo sobre los pacientes individuales y sobre la población de pacientes con diabetes es una característica crítica de los programas efectivos, especialmente aquellos que emplean enfoques basados en la población. El primer paso es establecer un registro de enfermedades para las prácticas individuales, que incluyan información de elementos de atención. Equipo de salud que tienen acceso a un registro, pueden localizar pacientes con necesidades específicas y entregarles una atención planificada, pueden recibir retroalimentación sobre su desempeño y pueden implementar sistemas de recordatorio." }
]

export const TITULOSEVAL_AREA: { [key: number]: string } = {
    1: "Organización del Sistema de Salud",
    2: "Cooperación Comunitaria",
    3: "Nivel de la práctica",
    4: "Normas de atención de la Diabetes Mellitus",
    5: "Apoyo técnico",
    6: "Sistema de Información de la Diabetes Mellitus"
}


//Devolver segun rama madre
export const FORMSAREA: { [key: number]: QuestArea } = {
    1: QuestArea1,
    2: QuestArea2,
    3: QuestArea3,
    4: QuestArea4,
    5: QuestArea5,
    6: QuestArea6
}

export function QuetSeleccion(id: number) {
    return FORMSAREA[id];
}