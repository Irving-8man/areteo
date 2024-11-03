import { Button, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { z } from "zod";

const scoresSchema = z.object({
  q1: z.number().min(0).max(11),
  q2: z.number().min(0).max(11),
  q3: z.number().min(0).max(11)
});

export default function AreaDos() {
  const [scores, setScores] = useState({ q1: 0, q2: 0, q3: 0 });
  const [descriptions, setDescriptions] = useState({
    q1: "",
    q2: "",
    q3: ""
  });
  const [showSummary, setShowSummary] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const optionsQ1 = [
    { value: 0, label: "0", description: "Nivel D:... no hay o no están organizados sistemáticamente." },
    { value: 1, label: "1", description: "Nivel D:... no hay o no están organizados sistemáticamente." },
    { value: 2, label: "2", description: "Nivel D:... no hay o no están organizados sistemáticamente." },
    { value: 3, label: "3", description: "Nivel C:... está limitada a una lista de recursos comunitarios en una forma que es accesible." },
    { value: 4, label: "4", description: "Nivel C:... está limitada a una lista de recursos comunitarios en una forma que es accesible." },
    { value: 5, label: "5", description: "Nivel C:... está limitada a una lista de recursos comunitarios en una forma que es accesible." },
    { value: 7, label: "6", description: "Nivel B:... es realizada a través de una persona que es reponsable de asegurarse que los equipos de salud y las personas con diabetes usen al máximo los recursos comunitarios." },
    { value: 8, label: "7", description: "Nivel B:... es realizada a través de una persona que es reponsable de asegurarse que los equipos de salud y las personas con diabetes usen al máximo los recursos comunitarios." },
    { value: 6, label: "8", description: "Nivel B:... es realizada a través de una persona que es reponsable de asegurarse que los equipos de salud y las personas con diabetes usen al máximo los recursos comunitarios." },
    { value: 9, label: "9", description: "Nivel A:... es realizada a través de la coordinación activa entre el sistema de salud, los organismos de servicio comunitarios y las personas con diabetes." },
    { value: 10, label: "10", description: "Nivel A:... es realizada a través de la coordinación activa entre el sistema de salud, los organismos de servicio comunitarios y las personas con diabetes." },
    { value: 11, label: "11", description: "Nivel A:... es realizada a través de la coordinación activa entre el sistema de salud, los organismos de servicio comunitarios y las personas con diabetes." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... no existen." },
    { value: 1, label: "1", description: "Nivel D:... no existen." },
    { value: 2, label: "2", description: "Nivel D:... no existen." },
    { value: 3, label: "3", description: "Nivel C:... están todavía considerándose pero no están implementadas." },
    { value: 4, label: "4", description: "Nivel C:... están todavía considerándose pero no están implementadas." },
    { value: 5, label: "5", description: "Nivel C:... están todavía considerándose pero no están implementadas." },
    { value: 6, label: "6", description: "Nivel B:... se forma para desarrollar programas y políticas de apoyo." },
    { value: 7, label: "7", description: "Nivel B:... se forma para desarrollar programas y políticas de apoyo." },
    { value: 8, label: "8", description: "Nivel B:... se forma para desarrollar programas y políticas de apoyo." },
    { value: 9, label: "9", description: "Nivel A:... se buscan activamente para desarrollar programas y políticas de apoyo para todo el sistema." },
    { value: 10, label: "10", description: "Nivel A:... se buscan activamente para desarrollar programas y políticas de apoyo para todo el sistema." },
    { value: 11, label: "11", description: "Nivel A:... se buscan activamente para desarrollar programas y políticas de apoyo para todo el sistema." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... no hay coordinación de guías/normas clínicas ni planes de salud, las medidas ni los recursos para la atención a la diabetes en la práctica médica." },
    { value: 1, label: "1", description: "Nivel D:... no hay coordinación de guías/normas clínicas ni planes de salud, las medidas ni los recursos para la atención a la diabetes en la práctica médica." },
    { value: 2, label: "2", description: "Nivel D:... no hay coordinación de guías/normas clínicas ni planes de salud, las medidas ni los recursos para la atención a la diabetes en la práctica médica." },
    { value: 3, label: "3", description: "Nivel C:... considera en algún grado la coordinación de guías/normas clínicas, medidas estandarizadas, o los recursos para el cuidado en la práctica médica, pero todavía no se han ejecutado los planes." },
    { value: 4, label: "4", description: "Nivel C:... considera en algún grado la coordinación de guías/normas clínicas, medidas estandarizadas, o los recursos para el cuidado en la práctica médica, pero todavía no se han ejecutado los planes." },
    { value: 5, label: "5", description: "Nivel C:... considera en algún grado la coordinación de guías/normas clínicas, medidas estandarizadas, o los recursos para el cuidado en la práctica médica, pero todavía no se han ejecutado los planes." },
    { value: 6, label: "6", description: "Nivel B:... coordina el uso de guías/normas médicas, las medidas o los recursos para el cuidado en la práctica médica en una o dos enfermedades crónicas concomitantes con la diabetes." },
    { value: 7, label: "7", description: "Nivel B:... coordina el uso de guías/normas médicas, las medidas o los recursos para el cuidado en la práctica médica en una o dos enfermedades crónicas concomitantes con la diabetes." },
    { value: 8, label: "8", description: "Nivel B:... coordina el uso de guías/normas médicas, las medidas o los recursos para el cuidado en la práctica médica en una o dos enfermedades crónicas concomitantes con la diabetes." },
    { value: 9, label: "9", description: "Nivel A:... coordina el uso de guías/normas médicas, las medidas estandarizadas ó recursos en la práctica medica para la mayoría de las enfermedades crónicas." },
    { value: 10, label: "10", description: "Nivel A:... coordina el uso de guías/normas médicas, las medidas estandarizadas ó recursos en la práctica medica para la mayoría de las enfermedades crónicas." },
    { value: 11, label: "11", description: "Nivel A:... coordina el uso de guías/normas médicas, las medidas estandarizadas ó recursos en la práctica medica para la mayoría de las enfermedades crónicas." }
  ];

  const totalScore = scores.q1 + scores.q2 + scores.q3;
  const averageScore = totalScore / 3;

  const handleScoreChange = (question: string, value: number, description: string) => {
    setScores((prevScores) => ({ ...prevScores, [question]: value }));
    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [question]: description
    }));
  };

  const handleSave = () => {
    // Validación con Zod
    const validation = scoresSchema.safeParse(scores);
    if (!validation.success) {
      setError("Por favor selecciona valores válidos para todas las preguntas.");
      return;
    }
    setError(null); // Limpiamos cualquier error previo si la validación pasa
    setShowSummary(true); // Mostrar el cuadro de resumen al hacer clic en "Guardar Evaluación"
  };

  return (
    <div className="flex">
      <section className="w-3/5 pl-10 flex flex-col mt-10">
        <p className="text-xl">Área 2: Cooperación Comunitaria</p>
        <p>Cooperación entre el sistema de salud y organismos comunitarios (o prestadores de servicios) y recursos comunitarios que desempeñan un papel importante en el manejo de la diabetes.</p>

        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Disponibilidad de recursos comunitarios para las personas con diabetes</Label>
              <Select
                id="question1"
                onChange={(e) => {
                  const option = optionsQ1[Number(e.target.value)];
                  handleScoreChange("q1", option.value, option.description);
                }}
              >
                {optionsQ1.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q1}</p>
            </div>
          </li>
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question2">2. Cooperación/coordinación con organismos comunitarios tales como La Asociación de Diabetes, casas farmacéuticas, organizaciones religiosas, etc.</Label>
              <Select
                id="question2"
                onChange={(e) => {
                  const option = optionsQ2[Number(e.target.value)];
                  handleScoreChange("q2", option.value, option.description);
                }}
              >
                {optionsQ2.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q2}</p>
            </div>
          </li>
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question3">3. Planes Regionales y/o Locales de Salud</Label>
              <Select
                id="question3"
                onChange={(e) => {
                  const option = optionsQ3[Number(e.target.value)];
                  handleScoreChange("q3", option.value, option.description);
                }}
              >
                {optionsQ3.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q3}</p>
            </div>
          </li>
        </ul>
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error si existe */}
        <Button type="submit" appearance="primary" className="w-2/5 py-2 mt-4" onClick={handleSave}>
          Guardar Evaluación
        </Button>
      </section>

      {showSummary && (
        <aside className="w-1/4 p-6 fixed right-20 top-44 bg-white border border-blue-200 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
          <h3 className="font-bold text-xl text-blue-600 mb-4">Resultados</h3>
          <p className="text-gray-700 mb-2">
            Puntuación total de la cooperación comunitaria: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
            Puntuación Promedio (puntuación de la cooperación comunitaria total/3): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
