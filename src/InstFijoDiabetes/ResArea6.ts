import { QuestArea, QUnidaArea } from "@/models/typesFijo";

export const Q1Area6: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay.",rango: [0, 1, 2] },
    { nivel: "C",texto: "...incluye los nombres, el diagnóstico, información de una persona que sirva de contacto, ya sea en papel o en la computadora.", rango: [3, 4, 5]},
    { nivel: "B",texto: "...permite clasificar pacientes con prioridades clínicas.",rango: [6, 7, 8]},
    { nivel: "A", texto: "...está ligada a guías/normas medicas las que proveen recordatorios y alertas acerca de los servicios necesarios.", rango: [9, 10, 11]}
];


export const Q2Area6: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...incluyen notificaciones generales para la atención de la diabetes, pero no describen los servicios necesarios al tiempo de una visita.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...incluyen indicaciones necesarias para grupos de pacientes con diabetes mediante notificación periódica.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...incluyen información específica para el equipo acerca de la observación de guías/normas clínicas con relación a la información médica.", rango: [9, 10, 11] }
];



export const Q3Area6: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay o no es específica para el equipo de trabajadores de salud.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se proporciona a intervalos infrecuentes y se comunica de una manera impersonal.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...se da a intervalos suficientemente frecuentes para monitorizar la calidad y es específica para el equipo de salud que da atención al paciente con diabetes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...es oportuna, específica para el equipo de salud y es transmitida personalmente y sistemáticamente por un líder para mejorar el desempeño del equipo.", rango: [9, 10, 11] }
];


export const Q4Area6: QUnidaArea[] = [
    { nivel: "D", texto: "...no hay.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...solo puede obtenerse con esfuerzos especiales o programación adicional.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...se puede obtenerse bajo solicitud, pero no se facilita sistemáticamente.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se proporciona sistemáticamente al equipo para ayudarlos a prestar la asistencia planificada.", rango: [9, 10, 11] }
];


export const Q5Area6: QUnidaArea[] = [
    { nivel: "D", texto: "...no se espera que haya.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se logran mediante un enfoque estandarizado.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...son establecidos en forma coordinada e incluyen el auto cuidado así como metas clínicas.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se establecen de manera coordinada e incluyen el auto cuidado y cuidado clínico. Se lleva a cabo un seguimiento que guía/norma de la atención.", rango: [9, 10, 11] }
];



//estas son las ques area
export const QuestArea6:QuestArea = {
    desc:"Un aspecto muy importante para la atención y programas de la diabetes es tener la información oportuna y útil acerca de los pacientes y las poblaciones de pacientes con diabetes.",
    num: 5,
    quests: [
        {
            orden: 1,
            componente: "Registros (listas de personas con diabetes)",
            quetUni: Q1Area6
        }, {
            orden: 2,
            componente: "Recordatorios para el equipo de salud (Ej. recordatorios de cita con el nefrólogo, laboratorio, cita a oftalmología, etc.)",
            quetUni: Q2Area6
        }, {
            orden: 3,
            componente: "Retroalimentación",
            quetUni: Q3Area6
        }, {
            orden: 4,
            componente: "Información acerca de los subgrupos de pacientes que requieren servicios especiales",
            quetUni: Q4Area6
        }, {
            orden: 5,
            componente: "Protocolos y planes de tratamientos",
            quetUni: Q5Area6
        }
    ],
    msgResult:["Puntuación total de los sistemas de información", "Puntuación promedio (puntuación de los sistemas de información /"]
}