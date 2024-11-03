import { Button, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { z } from "zod";

const scoresSchema = z.object({
  q1: z.number().min(0).max(11),
  q2: z.number().min(0).max(11),
  q3: z.number().min(0).max(11),
  q4: z.number().min(0).max(11),
  q5: z.number().min(0).max(11),
  q6: z.number().min(0).max(11)
});

export default function AreaUno() {
  const [scores, setScores] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0 });
  const [descriptions, setDescriptions] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: ""
  });
  const [showSummary, setShowSummary] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const optionsQ1 = [
    { value: 0, label: "0", description: "Nivel D:... no existe o hay poco interés." },
    { value: 1, label: "1", description: "Nivel D:... no existe o hay poco interés." },
    { value: 2, label: "2", description: "Nivel D:... no existe o hay poco interés." },
    { value: 3, label: "3", description: "Nivel C:... están reflejados en la visión del sistema de salud y en los planes de la organización, pero no hay recursos disponibles." },
    { value: 4, label: "4", description: "Nivel C:... están reflejados en la visión del sistema de salud y en los planes de la organización, pero no hay recursos disponibles." },
    { value: 5, label: "5", description: "Nivel C:... están reflejados en la visión del sistema de salud y en los planes de la organización, pero no hay recursos disponibles." },
    { value: 7, label: "6", description: "Nivel B:... están reflejados en la dirección de alto nivel y hay fondos y recursos humanos dedicados para la iniciativa." },
    { value: 8, label: "7", description: "Nivel B:... están reflejados en la dirección de alto nivel y hay fondos y recursos humanos dedicados para la iniciativa." },
    { value: 6, label: "8", description: "Nivel B:... están reflejados en la dirección de alto nivel y hay fondos y recursos humanos dedicados para la iniciativa." },
    { value: 9, label: "9", description: "Nivel A:... forma parte de la estrategia a largo plazo, recibe recursos necesarios, y hay recursos humanos específicos que son responsables de la iniciativa." },
    { value: 10, label: "10", description: "Nivel A:... forma parte de la estrategia a largo plazo, recibe recursos necesarios, y hay recursos humanos específicos que son responsables de la iniciativa." },
    { value: 11, label: "11", description: "Nivel A:... forma parte de la estrategia a largo plazo, recibe recursos necesarios, y hay recursos humanos específicos que son responsables de la iniciativa." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... no existen o son limitadas." },
    { value: 1, label: "1", description: "Nivel D:... no existen o son limitadas." },
    { value: 2, label: "2", description: "Nivel D:... no existen o son limitadas." },
    { value: 3, label: "3", description: "Nivel C:... existen pero no son revisadas regularmente." },
    { value: 4, label: "4", description: "Nivel C:... existen pero no son revisadas regularmente." },
    { value: 5, label: "5", description: "Nivel C:... existen pero no son revisadas regularmente." },
    { value: 6, label: "6", description: "Nivel B:... existen y son revisadas regularmente." },
    { value: 7, label: "7", description: "Nivel B:... existen y son revisadas regularmente." },
    { value: 8, label: "8", description: "Nivel B:... existen y son revisadas regularmente." },
    { value: 9, label: "9", description: "Nivel A:... son cuantificables, se revisan sistemáticamente y están incorporadas en los planes para el mejoramiento." },
    { value: 10, label: "10", description: "Nivel A:... son cuantificables, se revisan sistemáticamente y están incorporadas en los planes para el mejoramiento." },
    { value: 11, label: "11", description: "Nivel A:... son cuantificables, se revisan sistemáticamente y están incorporadas en los planes para el mejoramiento." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... son informales y no están organizadas; no tienen un apoyo permanente." },
    { value: 1, label: "1", description: "Nivel D:... son informales y no están organizadas; no tienen un apoyo permanente." },
    { value: 2, label: "2", description: "Nivel D:... son informales y no están organizadas; no tienen un apoyo permanente." },
    { value: 3, label: "3", description: "Nivel C:... utilizan enfoques informales para resolver problemas que surjan." },
    { value: 4, label: "4", description: "Nivel C:... utilizan enfoques informales para resolver problemas que surjan." },
    { value: 5, label: "5", description: "Nivel C:... utilizan enfoques informales para resolver problemas que surjan." },
    { value: 6, label: "6", description: "Nivel B:... utilizan estrategias de mejoramiento para resolver los problemas imprevistos." },
    { value: 7, label: "7", description: "Nivel B:... utilizan estrategias de mejoramiento para resolver los problemas imprevistos." },
    { value: 8, label: "8", description: "Nivel B:... utilizan estrategias de mejoramiento para resolver los problemas imprevistos." },
    { value: 9, label: "9", description: "Nivel A:... incluye estrategias previamente validadas que se utilizan activamente para alcanzar las metas institucionales." },
    { value: 10, label: "10", description: "Nivel A:... incluye estrategias previamente validadas que se utilizan activamente para alcanzar las metas institucionales." },
    { value: 11, label: "11", description: "Nivel A:... incluye estrategias previamente validadas que se utilizan activamente para alcanzar las metas institucionales." }
  ];

  const optionsQ4 = [
    { value: 0, label: "0", description: "Nivel D:... no se usan para influir en las metas de mejoramiento clínico." },
    { value: 1, label: "1", description: "Nivel D:... no se usan para influir en las metas de mejoramiento clínico." },
    { value: 2, label: "2", description: "Nivel D:... no se usan para influir en las metas de mejoramiento clínico." },
    { value: 3, label: "3", description: "Nivel C:... se usan para influir en la utilización y costos del cuidado de la diabetes." },
    { value: 4, label: "4", description: "Nivel C:... se usan para influir en la utilización y costos del cuidado de la diabetes.." },
    { value: 5, label: "5", description: "Nivel C:... se usan para influir en la utilización y costos del cuidado de la diabetes." },
    { value: 6, label: "6", description: "Nivel B:... se usan para apoyar las metas de los pacientes." },
    { value: 7, label: "7", description: "Nivel B:... se usan para apoyar las metas de los pacientes." },
    { value: 8, label: "8", description: "Nivel B:... se usan para apoyar las metas de los pacientes." },
    { value: 9, label: "9", description: "Nivel A:... se usan para motivar y facultar a los trabajadores de la salud para que apoyen las metas de la atención de la diabetes." },
    { value: 10, label: "10", description: "Nivel A:... se usan para motivar y facultar a los trabajadores de la salud para que apoyen las metas de la atención de la diabetes." },
    { value: 11, label: "11", description: "Nivel A:... se usan para motivar y facultar a los trabajadores de la salud para que apoyen las metas de la atención de la diabetes." }
  ];

  const optionsQ5 = [
    { value: 0, label: "0", description: "Nivel D:... no promueven la atención de la diabetes." },
    { value: 1, label: "1", description: "Nivel D:... no promueven la atención de la diabetes." },
    { value: 2, label: "2", description: "Nivel D:... no promueven la atención de la diabetes." },
    { value: 3, label: "3", description: "Nivel C:... no le dan prioridad a la atención de la diabetes." },
    { value: 4, label: "4", description: "Nivel C:... no le dan prioridad a la atención de la diabetes." },
    { value: 5, label: "5", description: "Nivel C:... no le dan prioridad a la atención de la diabetes." },
    { value: 6, label: "6", description: "Nivel B:... promueven los esfuerzos para mejorar el cuidado de la diabetes." },
    { value: 7, label: "7", description: "Nivel B:... promueven los esfuerzos para mejorar el cuidado de la diabetes." },
    { value: 8, label: "8", description: "Nivel B:... promueven los esfuerzos para mejorar el cuidado de la diabetes." },
    { value: 9, label: "9", description: "Nivel A:... abiertamente participan en los esfuerzos de mejoramiento de la atención de la diabetes." },
    { value: 10, label: "10", description: "Nivel A:... abiertamente participan en los esfuerzos de mejoramiento de la atención de la diabetes." },
    { value: 11, label: "11", description: "Nivel A:... abiertamente participan en los esfuerzos de mejoramiento de la atención de la diabetes." }
  ];

  const optionsQ6 = [
    { value: 0, label: "0", description: "Nivel D:... no promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 1, label: "1", description: "Nivel D:... no promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 2, label: "2", description: "Nivel D:... no promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 3, label: "3", description: "Nivel C:... ni promueven ni NO promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 4, label: "4", description: "Nivel C:... ni promueven ni NO promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 5, label: "5", description: "Nivel C:... ni promueven ni NO promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 6, label: "6", description: "Nivel B:... promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 7, label: "7", description: "Nivel B:... promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 8, label: "8", description: "Nivel B:... promueven el auto cuidado del paciente o los cambios del sistema de salud." },
    { value: 9, label: "9", description: "Nivel A:... hay asignación específica para la promoción y cuidado de la diabetes." },
    { value: 10, label: "10", description: "Nivel A:... hay asignación específica para la promoción y cuidado de la diabetes." },
    { value: 11, label: "11", description: "Nivel A:... hay asignación específica para la promoción y cuidado de la diabetes." }
  ];

  const totalScore = scores.q1 + scores.q2 + scores.q3 + scores.q4 + scores.q5 + scores.q6;
  const averageScore = totalScore / 6;

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
        <p className="text-xl">Área 1: Organización del Sistema de Salud</p>
        <p>El manejo de la diabetes puede ser más efectivo si el sistema de salud está organizado para controlar mejor las enfermedades crónicas y sus complicaciones.</p>

        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Organización y liderazgo para la atención de la diabetes</Label>
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
              <Label htmlFor="question2">2. Metas organizacionales para la atención de la diabetes</Label>
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
              <Label htmlFor="question3">3. Estrategias de mejoramiento para la atención de la diabetes</Label>
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
              <Label htmlFor="question3">4. Incentivos que incluye reconocimiento para el trabajador de la salud y regulaciones para la atención de la diabetes</Label>
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
              <Label htmlFor="question3">5. Lideres influyentes dentro del sector salud como de otros ministerios con poder de decisión</Label>
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
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question3">6. Beneficios relacionados con la educación del paciente para el auto cuido de la diabetes</Label>
              <Select
                id="question3"
                onChange={(e) => {
                  const option = optionsQ6[Number(e.target.value)];
                  handleScoreChange("q6", option.value, option.description);
                }}
              >
                {optionsQ6.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <p>{descriptions.q6}</p>
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
          Puntuación Total de la organización del sistema de salud: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
          Puntuación promedio (puntuación de la organización del sistema de salud total / 6): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
