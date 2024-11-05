import { QuetSeleccion } from "@/InstFijoDiabetes/Const";

type ResultadoEvaluacion = {
    total: number;
    promedio: number;
    targetTotal: string;
    targetPromedio: string;
    evaluacion: string;
};


type Respuesta = {
    orden: number;
    respuesta: number;
};


// Función para evaluar el soporte basado en el promedio
export function EvaluacionFinalTest(promedio: number): string {
    const promedioRedondeado = Math.round(promedio * 100) / 100;

    if (promedioRedondeado >= 0 && promedioRedondeado < 3) {
        return "Soporte limitado para el cuidado de enfermedades crónicas";
    } else if (promedioRedondeado >= 3 && promedioRedondeado < 6) {
        return "Soporte básico para el cuidado de enfermedades crónicas";
    } else if (promedioRedondeado >= 6 && promedioRedondeado < 9) {
        return "Soporte razonablemente bueno para el cuidado de enfermedades crónicas";
    } else if (promedioRedondeado >= 9 && promedioRedondeado <= 11) {
        return "Soporte completamente desarrollado para el cuidado de enfermedades crónicas";
    } else {
        return "Rango de puntuación no válido";
    }
}


// Función principal para calcular resultados
export default function CalcularResultadosTest(id: number, resultados: Respuesta[]): ResultadoEvaluacion {
    const area = QuetSeleccion(id);
    if (!area) {
        throw new Error(`Área con id ${id} no encontrada`);
    }

    const total = resultados.reduce((sum, res) => {
        return sum + res.respuesta;
    }, 0);

    const promedio = resultados.length > 0 ? total / resultados.length : 0;
    const evaluacion = EvaluacionFinalTest(promedio);

    return {
        total,
        targetTotal: `${area.msgResult[0]}`,
        promedio,
        targetPromedio: `${area.msgResult[1]} ${area.num} )`,
        evaluacion
    };
}