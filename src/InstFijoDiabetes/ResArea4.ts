import { QuestArea, QUnidaArea } from "@/models/typesFijo";

//Arear 4
export const Q1Area4: QUnidaArea[] = [
    { nivel: 'D', texto: '...no hay o no están disponibles.', rango: [0, 1, 2] },
    { nivel: 'C', texto: '...hay pero no están integradas en la atención de diabetes.', rango: [3, 4, 5] },
    { nivel: 'B', texto: '...hay y son apoyadas por la educación ofrecida a través de los equipos de trabajadores de la salud.', rango: [6, 7, 8] },
    { nivel: 'A', texto: '...hay y apoyan al equipo de salud y son parte de la atención a personas con diabetes a través de recordatorios y otros métodos para cambios del comportamiento.', rango: [9, 10, 11] }
];

export const Q2Area4: QUnidaArea[] = [
    { nivel: 'D', texto: '...se ofrece primariamente a través de la referencia tradicional.', rango: [0, 1, 2] },
    { nivel: 'C', texto: '...se logra a través de especialistas para mejor la capacidad global para implementar las guías/normas de manejo.', rango: [3, 4, 5] },
    { nivel: 'B', texto: '...incluye influyentes especialistas así como designados a proveer entrenamiento al equipo de salud de atención primaria.', rango: [6, 7, 8] },
    { nivel: 'A', texto: '...incluye influyentes y especialistas que están designados a mejorar la atención primaria de la diabetes.', rango: [9, 10, 11] }
];


export const Q3Area4: QUnidaArea[] = [
    { nivel: 'D', texto: '...se proporciona esporádicamente.', rango: [0, 1, 2] },
    { nivel: 'C', texto: '...se proporciona sistemáticamente mediante los métodos tradicionales.', rango: [3, 4, 5] },
    { nivel: 'B', texto: '...se proporciona usando métodos optimizados (Ej. Cursos acreditados o calificados).', rango: [6, 7, 8] },
    { nivel: 'A', texto: '...incluye el entrenamiento de todos los equipos asistenciales incluyendo manejo de poblaciones de personas con diabetes y apoyo de auto cuidado.', rango: [9, 10, 11] }
];

export const Q4Area4: QUnidaArea[] = [
    { nivel: 'D', texto: '...no se proporciona información.', rango: [0, 1, 2] },
    { nivel: 'C', texto: '...se hace por petición o a través de publicaciones.', rango: [3, 4, 5] },
    { nivel: 'B', texto: '...se hace a través de materiales educativos específicos para cada guía/norma clínica.', rango: [6, 7, 8] },
    { nivel: 'A', texto: '...incluye materiales específicos desarrollados para los pacientes donde se describen sus funciones en el logro y cumplimiento de las guías/normas.', rango: [9, 10, 11] }
];


//estas son las ques area
export const QuestArea4:QuestArea = {
    num: 4,
    quests: [
        {
            orden: 1,
            componente: "Guías/ normas de diabetes basadas en evidencias medicas",
            quetUni: Q1Area4
        }, {
            orden: 2,
            componente: "Participación de los especialistas dentro del sistema de salud para el mejoramiento de la atención primaria de la diabetes",
            quetUni: Q2Area4
        }, {
            orden: 3,
            componente: "Educación al equipo de salud de atención de la diabetes",
            quetUni: Q3Area4
        }, {
            orden: 4,
            componente: "Informar a las personas con diabetes acerca de guías/normas medicas",
            quetUni: Q4Area4
        },
    ]
}