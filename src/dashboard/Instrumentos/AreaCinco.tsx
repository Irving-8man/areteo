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

export default function AreaCinco() {
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
    { value: 0, label: "0", description: "Nivel D:... no se aborda." },
    { value: 1, label: "1", description: "Nivel D:... no se aborda." },
    { value: 2, label: "2", description: "Nivel D:... no se aborda." },
    { value: 3, label: "3", description: "Nivel C:... se aborda asumiendo que están disponibles individuos con un entrenamiento en los elementos claves de atención a la diabetes." },
    { value: 4, label: "4", description: "Nivel C:... se aborda asumiendo que están disponibles individuos con un entrenamiento en los elementos claves de atención a la diabetes." },
    { value: 5, label: "5", description: "Nivel C:... se aborda asumiendo que están disponibles individuos con un entrenamiento en los elementos claves de atención a la diabetes." },
    { value: 7, label: "6", description: "Nivel B:... está garantizado por reuniones periódicas del equipo para abordar las normas, las funciones y los problemas en el cuidado de atención a la diabetes." },
    { value: 8, label: "7", description: "Nivel B:... está garantizado por reuniones periódicas del equipo para abordar las normas, las funciones y los problemas en el cuidado de atención a la diabetes." },
    { value: 6, label: "8", description: "Nivel B:... está garantizado por reuniones periódicas del equipo para abordar las normas, las funciones y los problemas en el cuidado de atención a la diabetes." },
    { value: 9, label: "9", description: "Nivel A:... está garantizado por un equipo que se reúne regularmente y han definido claramente las funciones, incluyendo la educación del auto cuidado, el seguimiento preventivo y la coordinación con otros recursos." },
    { value: 10, label: "10", description: "Nivel A:... está garantizado por un equipo que se reúne regularmente y han definido claramente las funciones, incluyendo la educación del auto cuidado, el seguimiento preventivo y la coordinación con otros recursos." },
    { value: 11, label: "11", description: "Nivel A:... está garantizado por un equipo que se reúne regularmente y han definido claramente las funciones, incluyendo la educación del auto cuidado, el seguimiento preventivo y la coordinación con otros recursos." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... no es reconocido localmente ni por el sistema." },
    { value: 1, label: "1", description: "Nivel D:... no es reconocido localmente ni por el sistema." },
    { value: 2, label: "2", description: "Nivel D:... no es reconocido localmente ni por el sistema." },
    { value: 3, label: "3", description: "Nivel C:... es reconocido por la organización que se localiza en un lugar específico en el organigrama de funciones." },
    { value: 4, label: "4", description: "Nivel C:... es reconocido por la organización que se localiza en un lugar específico en el organigrama de funciones." },
    { value: 5, label: "5", description: "Nivel C:... es reconocido por la organización que se localiza en un lugar específico en el organigrama de funciones." },
    { value: 6, label: "6", description: "Nivel B:... está garantizado mediante el nombramiento de un líder de equipo, pero su función no está definida con respecto a la diabetes." },
    { value: 7, label: "7", description: "Nivel B:... está garantizado mediante el nombramiento de un líder de equipo, pero su función no está definida con respecto a la diabetes." },
    { value: 8, label: "8", description: "Nivel B:... está garantizado mediante el nombramiento de un líder de equipo, pero su función no está definida con respecto a la diabetes." },
    { value: 9, label: "9", description: "Nivel A:... está garantizado mediante el nombramiento de un líder de equipo que asegura de que las funciones y responsabilidades en la atención a la diabetes se definan claramente." },
    { value: 10, label: "10", description: "Nivel A:... está garantizado mediante el nombramiento de un líder de equipo que asegura de que las funciones y responsabilidades en la atención a la diabetes se definan claramente." },
    { value: 11, label: "11", description: "Nivel A:... está garantizado mediante el nombramiento de un líder de equipo que asegura de que las funciones y responsabilidades en la atención a la diabetes se definan claramente." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... puede usarse para programar las visitas de atención preventivas o de descompensación agudas." },
    { value: 1, label: "1", description: "Nivel D:... puede usarse para programar las visitas de atención preventivas o de descompensación agudas." },
    { value: 2, label: "2", description: "Nivel D:... puede usarse para programar las visitas de atención preventivas o de descompensación agudas." },
    { value: 3, label: "3", description: "Nivel C:... garantiza la atención oportuna para las personas con diabetes." },
    { value: 4, label: "4", description: "Nivel C:... garantiza la atención oportuna para las personas con diabetes." },
    { value: 5, label: "5", description: "Nivel C:... garantiza la atención oportuna para las personas con diabetes." },
    { value: 6, label: "6", description: "Nivel B:... es flexible y puede incluir innovaciones tales como visitas personalizadas sin tiempo definido o visitas de grupo." },
    { value: 7, label: "7", description: "Nivel B:... es flexible y puede incluir innovaciones tales como visitas personalizadas sin tiempo definido o visitas de grupo." },
    { value: 8, label: "8", description: "Nivel B:... es flexible y puede incluir innovaciones tales como visitas personalizadas sin tiempo definido o visitas de grupo." },
    { value: 9, label: "9", description: "Nivel A:... incluye la organización de la atención, la cual facilita que los pacientes puedan ver múltiples proveedores de salud en una sola visita." },
    { value: 10, label: "10", description: "Nivel A:... incluye la organización de la atención, la cual facilita que los pacientes puedan ver múltiples proveedores de salud en una sola visita." },
    { value: 11, label: "11", description: "Nivel A:... incluye la organización de la atención, la cual facilita que los pacientes puedan ver múltiples proveedores de salud en una sola visita." }
  ];

  const optionsQ4 = [
    { value: 0, label: "0", description: "Nivel D:... es programado por los pacientes o los proveedores en una manera caso por caso." },
    { value: 1, label: "1", description: "Nivel D:... es programado por los pacientes o los proveedores en una manera caso por caso." },
    { value: 2, label: "2", description: "Nivel D:... es programado por los pacientes o los proveedores en una manera caso por caso." },
    { value: 3, label: "3", description: "Nivel C:... es programado mediante la práctica en conformidad con las guías/normas." },
    { value: 4, label: "4", description: "Nivel C:... es programado mediante la práctica en conformidad con las guías/normas." },
    { value: 5, label: "5", description: "Nivel C:... es programado mediante la práctica en conformidad con las guías/normas." },
    { value: 6, label: "6", description: "Nivel B:... es garantizado por el equipo de salud mediante monitoreo de pacientes." },
    { value: 7, label: "7", description: "Nivel B:... es garantizado por el equipo de salud mediante monitoreo de pacientes." },
    { value: 8, label: "8", description: "Nivel B:... es garantizado por el equipo de salud mediante monitoreo de pacientes." },
    { value: 9, label: "9", description: "Nivel A:... es de acuerdo con las necesidades del paciente, varía en intensidad y metodología (teléfono, personal,) y se asegura usar una guía/norma." },
    { value: 10, label: "10", description: "Nivel A:... es de acuerdo con las necesidades del paciente, varía en intensidad y metodología (teléfono, personal,) y se asegura usar una guía/norma." },
    { value: 11, label: "11", description: "Nivel A:... es de acuerdo con las necesidades del paciente, varía en intensidad y metodología (teléfono, personal,) y se asegura usar una guía/norma." }
  ];

  const optionsQ5 = [
    { value: 0, label: "0", description: "Nivel D:... no se hacen." },
    { value: 1, label: "1", description: "Nivel D:... no se hacen." },
    { value: 2, label: "2", description: "Nivel D:... no se hacen." },
    { value: 3, label: "3", description: "Nivel C:... se hacen ocasionalmente para los pacientes complicados." },
    { value: 4, label: "4", description: "Nivel C:... se hacen ocasionalmente para los pacientes complicados." },
    { value: 5, label: "5", description: "Nivel C:... se hacen ocasionalmente para los pacientes complicados." },
    { value: 6, label: "6", description: "Nivel B:... son opciones para pacientes interesados." },
    { value: 7, label: "7", description: "Nivel B:... son opciones para pacientes interesados." },
    { value: 8, label: "8", description: "Nivel B:... son opciones para pacientes interesados." },
    { value: 9, label: "9", description: "Nivel A:... se llevan a cabo para todos los pacientes e incluyen la evaluación periódica, las intervenciones preventivas y apoyo al auto cuidado." },
    { value: 10, label: "10", description: "Nivel A:... se llevan a cabo para todos los pacientes e incluyen la evaluación periódica, las intervenciones preventivas y apoyo al auto cuidado." },
    { value: 11, label: "11", description: "Nivel A:... se llevan a cabo para todos los pacientes e incluyen la evaluación periódica, las intervenciones preventivas y apoyo al auto cuidado." }
  ];

  const optionsQ6 = [
    { value: 0, label: "0", description: "Nivel D:... no es una prioridad." },
    { value: 1, label: "1", description: "Nivel D:... no es una prioridad." },
    { value: 2, label: "2", description: "Nivel D:... no es una prioridad." },
    { value: 3, label: "3", description: "Nivel C:... depende de la comunicación escrita entre los proveedores de atención primaria, los especialistas y los gestores de casos." },
    { value: 4, label: "4", description: "Nivel C:... depende de la comunicación escrita entre los proveedores de atención primaria, los especialistas y los gestores de casos." },
    { value: 5, label: "5", description: "Nivel C:... depende de la comunicación escrita entre los proveedores de atención primaria, los especialistas y los gestores de casos." },
    { value: 6, label: "6", description: "Nivel B:... es una prioridad entre proveedores de atención primaria, especialistas y otros proveedores pero no se lleva a cabo sistemáticamente." },
    { value: 7, label: "7", description: "Nivel B:... es una prioridad entre proveedores de atención primaria, especialistas y otros proveedores pero no se lleva a cabo sistemáticamente." },
    { value: 8, label: "8", description: "Nivel B:... es una prioridad entre proveedores de atención primaria, especialistas y otros proveedores pero no se lleva a cabo sistemáticamente." },
    { value: 9, label: "9", description: "Nivel A:... es una alta prioridad y todas las intervenciones para la diabetes incluyen una coordinación activa entre la atención primaria, los especialistas y los otros grupos pertinentes." },
    { value: 10, label: "10", description: "Nivel A:... es una alta prioridad y todas las intervenciones para la diabetes incluyen una coordinación activa entre la atención primaria, los especialistas y los otros grupos pertinentes." },
    { value: 11, label: "11", description: "Nivel A:... es una alta prioridad y todas las intervenciones para la diabetes incluyen una coordinación activa entre la atención primaria, los especialistas y los otros grupos pertinentes." }
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
        <p className="text-xl">Área 5: Apoyo técnico</p>
        <p>La evidencia sugiere que un manejo efectivo de la atención de diabetes incluye algo más que simplemente agregar otras intervenciones al sistema actual, que es basado en la atención de enfermedades de carácter agudo o intensivo. Podría requerir cambios en la organización de la práctica que repercutan en la prestación de la atención.</p>

        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Funcionamiento del equipo de salud</Label>
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
              <Label htmlFor="question2">2. Liderazgo del equipo de salud</Label>
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
              <Label htmlFor="question3">3. Sistema de Cita</Label>
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
              <Label htmlFor="question3">4. Citas de seguimiento</Label>
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
              <Label htmlFor="question3">5. Visitas flotantes o por demanda espontánea del paciente</Label>
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
              <Label htmlFor="question3">6. Continuidad en el cuidado de la diabetes</Label>
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
          Puntuación total del apoyo técnico asistencial: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
          Puntuación promedio (puntuación del apoyo técnico asistencial: /6): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
