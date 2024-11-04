import { Button, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { z } from "zod";

const scoresSchema = z.object({
  q1: z.number().min(0).max(11),
  q2: z.number().min(0).max(11),
  q3: z.number().min(0).max(11),
  q4: z.number().min(0).max(11),
  q5: z.number().min(0).max(11),
});

export default function AreaSeis() {
  const [scores, setScores] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0});
  const [descriptions, setDescriptions] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: ""
  });
  const [showSummary, setShowSummary] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const optionsQ1 = [
    { value: 0, label: "0", description: "Nivel D:... no hay." },
    { value: 1, label: "1", description: "Nivel D:... no hay." },
    { value: 2, label: "2", description: "Nivel D:... no hay." },
    { value: 3, label: "3", description: "Nivel C:... incluye los nombres, el diagnóstico, información de una persona que sirva de contacto, ya sea en papel o en la computadora." },
    { value: 4, label: "4", description: "Nivel C:... incluye los nombres, el diagnóstico, información de una persona que sirva de contacto, ya sea en papel o en la computadora." },
    { value: 5, label: "5", description: "Nivel C:... incluye los nombres, el diagnóstico, información de una persona que sirva de contacto, ya sea en papel o en la computadora." },
    { value: 7, label: "6", description: "Nivel B:... permite clasificar pacientes con prioridades clínicas." },
    { value: 8, label: "7", description: "Nivel B:... permite clasificar pacientes con prioridades clínicas." },
    { value: 6, label: "8", description: "Nivel B:... permite clasificar pacientes con prioridades clínicas." },
    { value: 9, label: "9", description: "Nivel A:... está ligada a guías/normas medicas las que proveen recordatorios y alertas acerca de los servicios necesarios." },
    { value: 10, label: "10", description: "Nivel A:... está ligada a guías/normas medicas las que proveen recordatorios y alertas acerca de los servicios necesarios." },
    { value: 11, label: "11", description: "Nivel A:... está ligada a guías/normas medicas las que proveen recordatorios y alertas acerca de los servicios necesarios." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... no hay." },
    { value: 1, label: "1", description: "Nivel D:... no hay." },
    { value: 2, label: "2", description: "Nivel D:... no hay." },
    { value: 3, label: "3", description: "Nivel C:... incluyen notificaciones generales para la atención de la diabetes, pero no describen los servicios necesarios al tiempo de una visita." },
    { value: 4, label: "4", description: "Nivel C:... incluyen notificaciones generales para la atención de la diabetes, pero no describen los servicios necesarios al tiempo de una visita." },
    { value: 5, label: "5", description: "Nivel C:... incluyen notificaciones generales para la atención de la diabetes, pero no describen los servicios necesarios al tiempo de una visita." },
    { value: 6, label: "6", description: "Nivel B:... incluyen indicaciones necesarias para grupos de pacientes con diabetes mediante notificación periódica." },
    { value: 7, label: "7", description: "Nivel B:... incluyen indicaciones necesarias para grupos de pacientes con diabetes mediante notificación periódica." },
    { value: 8, label: "8", description: "Nivel B:... incluyen indicaciones necesarias para grupos de pacientes con diabetes mediante notificación periódica." },
    { value: 9, label: "9", description: "Nivel A:... incluyen información específica para el equipo acerca de la observación de guías/normas clínicas con relación a la información médica." },
    { value: 10, label: "10", description: "Nivel A:... incluyen información específica para el equipo acerca de la observación de guías/normas clínicas con relación a la información médica." },
    { value: 11, label: "11", description: "Nivel A:... incluyen información específica para el equipo acerca de la observación de guías/normas clínicas con relación a la información médica." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... no hay o no es específica para el equipo de trabajadores de salud." },
    { value: 1, label: "1", description: "Nivel D:... no hay o no es específica para el equipo de trabajadores de salud." },
    { value: 2, label: "2", description: "Nivel D:... no hay o no es específica para el equipo de trabajadores de salud." },
    { value: 3, label: "3", description: "Nivel C:... se proporciona a intervalos infrecuentes y se comunica de una manera impersonal." },
    { value: 4, label: "4", description: "Nivel C:... se proporciona a intervalos infrecuentes y se comunica de una manera impersonal." },
    { value: 5, label: "5", description: "Nivel C:... se proporciona a intervalos infrecuentes y se comunica de una manera impersonal." },
    { value: 6, label: "6", description: "Nivel B:... se da a intervalos suficientemente frecuentes para monitorizar la calidad y es específica para el equipo de salud que da atención al paciente con diabetes." },
    { value: 7, label: "7", description: "Nivel B:... se da a intervalos suficientemente frecuentes para monitorizar la calidad y es específica para el equipo de salud que da atención al paciente con diabetes." },
    { value: 8, label: "8", description: "Nivel B:... se da a intervalos suficientemente frecuentes para monitorizar la calidad y es específica para el equipo de salud que da atención al paciente con diabetes." },
    { value: 9, label: "9", description: "Nivel A:... es oportuna, específica para el equipo de salud y es transmitida personalmente y sistemáticamente por un líder para mejorar el desempeño del equipo." },
    { value: 10, label: "10", description: "Nivel A:... es oportuna, específica para el equipo de salud y es transmitida personalmente y sistemáticamente por un líder para mejorar el desempeño del equipo." },
    { value: 11, label: "11", description: "Nivel A:... es oportuna, específica para el equipo de salud y es transmitida personalmente y sistemáticamente por un líder para mejorar el desempeño del equipo." }
  ];

  const optionsQ4 = [
    { value: 0, label: "0", description: "Nivel D:... no hay." },
    { value: 1, label: "1", description: "Nivel D:... no hay." },
    { value: 2, label: "2", description: "Nivel D:... no hay." },
    { value: 3, label: "3", description: "Nivel C:... solo puede obtenerse con esfuerzos especiales o programación adicional." },
    { value: 4, label: "4", description: "Nivel C:... solo puede obtenerse con esfuerzos especiales o programación adicional." },
    { value: 5, label: "5", description: "Nivel C:... solo puede obtenerse con esfuerzos especiales o programación adicional." },
    { value: 6, label: "6", description: "Nivel B:... se puede obtenerse bajo solicitud, pero no se facilita sistemáticamente." },
    { value: 7, label: "7", description: "Nivel B:... se puede obtenerse bajo solicitud, pero no se facilita sistemáticamente." },
    { value: 8, label: "8", description: "Nivel B:... se puede obtenerse bajo solicitud, pero no se facilita sistemáticamente." },
    { value: 9, label: "9", description: "Nivel A:... se proporciona sistemáticamente al equipo para ayudarlos a prestar la asistencia planificada." },
    { value: 10, label: "10", description: "Nivel A:... se proporciona sistemáticamente al equipo para ayudarlos a prestar la asistencia planificada." },
    { value: 11, label: "11", description: "Nivel A:... se proporciona sistemáticamente al equipo para ayudarlos a prestar la asistencia planificada." }
  ];

  const optionsQ5 = [
    { value: 0, label: "0", description: "Nivel D:... no se espera que haya." },
    { value: 1, label: "1", description: "Nivel D:... no se espera que haya." },
    { value: 2, label: "2", description: "Nivel D:... no se espera que haya." },
    { value: 3, label: "3", description: "Nivel C:... se logran mediante un enfoque estandarizado." },
    { value: 4, label: "4", description: "Nivel C:... se logran mediante un enfoque estandarizado." },
    { value: 5, label: "5", description: "Nivel C:... se logran mediante un enfoque estandarizado." },
    { value: 6, label: "6", description: "Nivel B:... son establecidos en forma coordinada e incluyen el auto cuidado así como metas clínicas." },
    { value: 7, label: "7", description: "Nivel B:... son establecidos en forma coordinada e incluyen el auto cuidado así como metas clínicas." },
    { value: 8, label: "8", description: "Nivel B:... son establecidos en forma coordinada e incluyen el auto cuidado así como metas clínicas." },
    { value: 9, label: "9", description: "Nivel A:... se establecen de manera coordinada e incluyen el auto cuidado y cuidado clínico. Se lleva a cabo un seguimiento que guía/norma de la atención." },
    { value: 10, label: "10", description: "Nivel A:... se establecen de manera coordinada e incluyen el auto cuidado y cuidado clínico. Se lleva a cabo un seguimiento que guía/norma de la atención." },
    { value: 11, label: "11", description: "Nivel A:... se establecen de manera coordinada e incluyen el auto cuidado y cuidado clínico. Se lleva a cabo un seguimiento que guía/norma de la atención." }
  ];

  

  const totalScore = scores.q1 + scores.q2 + scores.q3 + scores.q4 + scores.q5;
  const averageScore = totalScore / 5;

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
        <p className="text-xl">Área 6: Sistema de Información de la Diabetes Mellitus</p>
        <p>Un aspecto muy importante para la atención y programas de la diabetes es tener la información oportuna y útil acerca de los pacientes y las poblaciones de pacientes con diabetes.</p>

        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Registros (listas de personas con diabetes)</Label>
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
              <Label htmlFor="question2">2. Recordatorios para el equipo de salud (Ej. recordatorios de cita con el nefrólogo, laboratorio, cita a oftalmología, etc.)</Label>
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
              <Label htmlFor="question3">3. Retroalimentación</Label>
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
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question3">4. Información acerca de los subgrupos de pacientes que requieren servicios especiales</Label>
              <Select
                id="question4"
                onChange={(e) => {
                  const option = optionsQ4[Number(e.target.value)];
                  handleScoreChange("q4", option.value, option.description);
                }}
              >
                {optionsQ4.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q4}</p>
            </div>
          </li>
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question3">5. Protocolos y planes de tratamientos</Label>
              <Select
                id="question5"
                onChange={(e) => {
                  const option = optionsQ5[Number(e.target.value)];
                  handleScoreChange("q5", option.value, option.description);
                }}
              >
                {optionsQ5.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q5}</p>
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
          Puntuación total de los sistemas de información: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
          Puntuación promedio (puntuación de los sistemas de información /5): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
