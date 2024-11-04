import { QuestArea, QUnidaArea } from "@/models/typesFijo";

export const Q1Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...no se aborda.",rango: [0, 1, 2] },
    { nivel: "C",texto: "...se aborda asumiendo que están disponibles individuos con un entrenamiento en los elementos claves de atención a la diabetes.", rango: [3, 4, 5]},
    { nivel: "B",texto: "...está garantizado por reuniones periódicas del equipo para abordar las normas, las funciones y los problemas en el cuidado de atención a la diabetes.",rango: [6, 7, 8]},
    { nivel: "A", texto: "...está garantizado por un equipo que se reúne regularmente y han definido claramente las funciones, incluyendo la educación del auto cuidado, el seguimiento preventivo y la coordinación con otros recursos.", rango: [9, 10, 11]}
];


export const Q2Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...no es reconocido localmente ni por el sistema.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...es reconocido por la organización que se localiza en un lugar específico en el organigrama de funciones.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...está garantizado mediante el nombramiento de un líder de equipo, pero su función no está definida con respecto a la diabetes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...está garantizado mediante el nombramiento de un líder de equipo que asegura de que las funciones y responsabilidades en la atención a la diabetes se definan claramente.", rango: [9, 10, 11] }
];



export const Q3Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...puede usarse para programar las visitas de atención preventivas o de descompensación agudas.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...garantiza la atención oportuna para las personas con diabetes.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...es flexible y puede incluir innovaciones tales como visitas personalizadas sin tiempo definido o visitas de grupo.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...incluye la organización de la atención, la cual facilita que los pacientes puedan ver múltiples proveedores de salud en una sola visita.", rango: [9, 10, 11] }
];


export const Q4Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...es programado por los pacientes o los proveedores en una manera caso por caso.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...es programado mediante la práctica en conformidad con las guías/normas.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...es garantizado por el equipo de salud mediante monitoreo de pacientes.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...es de acuerdo con las necesidades del paciente, varía en intensidad y metodología (teléfono, personal,) y se asegura usar una guía/norma.", rango: [9, 10, 11] }
];


export const Q5Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...no se hacen.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...se hacen ocasionalmente para los pacientes complicados.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...son opciones para pacientes interesados.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...se llevan a cabo para todos los pacientes e incluyen la evaluación periódica, las intervenciones preventivas y apoyo al auto cuidado.", rango: [9, 10, 11] }
];


export const Q6Area5: QUnidaArea[]  = [
    { nivel: "D", texto: "...no es una prioridad.", rango: [0, 1, 2] },
    { nivel: "C", texto: "...depende de la comunicación escrita entre los proveedores de atención primaria, los especialistas y los gestores de casos.", rango: [3, 4, 5] },
    { nivel: "B", texto: "...es una prioridad entre proveedores de atención primaria, especialistas y otros proveedores pero no se lleva a cabo sistemáticamente.", rango: [6, 7, 8] },
    { nivel: "A", texto: "...es una alta prioridad y todas las intervenciones para la diabetes incluyen una coordinación activa entre la atención primaria, los especialistas y los otros grupos pertinentes.", rango: [9, 10, 11] }
];


//estas son las ques area
export const QuestArea5:QuestArea = {
    desc:"La evidencia sugiere que un manejo efectivo de la atención de diabetes incluye algo más que simplemente agregar otras intervenciones al sistema actual, que es basado en la atención de enfermedades de carácter agudo o intensivo. Podría requerir cambios en la organización de la práctica que repercutan en la prestación de la atención.",
    num: 6,
    quests: [
        {
            orden: 1,
            componente: "Funcionamiento del equipo de salud",
            quetUni: Q1Area5
        }, {
            orden: 2,
            componente: "Liderazgo del equipo de salud",
            quetUni: Q2Area5
        }, {
            orden: 3,
            componente: "Sistema de Cita",
            quetUni: Q3Area5
        }, {
            orden: 4,
            componente: "Citas de seguimiento",
            quetUni: Q4Area5
        }, {
            orden: 5,
            componente: "Visitas flotantes o por demanda espontánea del paciente",
            quetUni: Q5Area5
        }, {
            orden: 6,
            componente: "Continuidad en el cuidado de la diabetes",
            quetUni: Q6Area5
        }
    ],
    msgResult:["Puntuación total del apoyo técnico asistencial", "Puntuación promedio (puntuación del apoyo técnico asistencial /"]
}