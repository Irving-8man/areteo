import { QuetSeleccion } from "@/InstFijoDiabetes/Const";

type ResultadoEvaluacion = {
    total: number;
    promedio: number;
    targetTotal: string;
    targetPromedio:string;
    evaluacion: string;
};


type Respuesta = {
    orden: number;
    respuesta: number;
};


// Función para evaluar el soporte basado en el promedio
export function EvaluacionFinalTest(promedio: number): string {
    if (promedio >= 0 && promedio <= 2) {
        return "Soporte limitado para el cuidado de enfermedades crónicas";
    } else if (promedio >= 3 && promedio <= 5) {
        return "Soporte básico para el cuidado de enfermedades crónicas";
    } else if (promedio >= 6 && promedio <= 8) {
        return "Soporte razonablemente bueno para el cuidado de enfermedades crónicas";
    } else if (promedio >= 9 && promedio <= 11) {
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
        targetPromedio:`${area.msgResult[1]} ${area.num} )`,
        evaluacion
    };
}