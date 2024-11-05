import { QuetSeleccion } from "@/InstFijoDiabetes/Const";
import { respuestaACIC } from "@/models/typesFijo";

export function ProcesarRespACIC(idArea: number, respuestasDadas: { orden: number, puntuacion: number }[]) {
    const QSelect = QuetSeleccion(idArea);

    const respuestasProcesadas:respuestaACIC[] = respuestasDadas.map(respuesta => {
        const quest = QSelect.quests.find(q => q.orden === respuesta.orden);

        if (quest) {
            const descripcion = quest.quetUni.find(q => q.rango.includes(respuesta.puntuacion));
            if (descripcion) {
                return {
                    orden: respuesta.orden,
                    puntuacion: respuesta.puntuacion,
                    componente: quest.componente, // Añadiendo el componente aquí
                    nivel: descripcion.nivel,
                    descripcion: descripcion.texto
                };
            }
        }
        return {
            orden: respuesta.orden,
            puntuacion: respuesta.puntuacion,
            componente: quest ? quest.componente : "No encontrado", // Manejar el caso donde quest no es encontrado
            nivel: "No encontrado",
            descripcion: "No hay descripción disponible para esta puntuación"
        };
    });

    return respuestasProcesadas;
}
