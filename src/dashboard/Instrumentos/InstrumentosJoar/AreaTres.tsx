import { Button, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { z } from "zod";

const scoresSchema = z.object({
  q1: z.number().min(0).max(11),
  q2: z.number().min(0).max(11),
  q3: z.number().min(0).max(11),
  q4: z.number().min(0).max(11),
});

export default function AreaTres() {
  const [scores, setScores] = useState({ q1: 0, q2: 0, q3: 0, q4: 0 });
  const [descriptions, setDescriptions] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
   
  });
  const [showSummary, setShowSummary] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  const optionsQ1 = [
    { value: 0, label: "0", description: "Nivel D:... no se han hecho." },
    { value: 1, label: "1", description: "Nivel D:... no se han hecho." },
    { value: 2, label: "2", description: "Nivel D:... no se han hecho." },
    { value: 3, label: "3", description: "Nivel C:... se espera hacerlas." },
    { value: 4, label: "4", description: "Nivel C:... se espera hacerlas." },
    { value: 5, label: "5", description: "Nivel C:... se espera hacerlas." },
    { value: 7, label: "6", description: "Nivel B:... son completadas estandarizadamente." },
    { value: 8, label: "7", description: "Nivel B:... son completadas estandarizadamente." },
    { value: 6, label: "8", description: "Nivel B:... son completadas estandarizadamente." },
    { value: 9, label: "9", description: "Nivel A:... se evalúan y documentan regularmente en forma estandarizada relacionadas a un plan de tratamiento disponible para el equipo de salud y para las personas con diabetes." },
    { value: 10, label: "10", description: "Nivel A:... se evalúan y documentan regularmente en forma estandarizada relacionadas a un plan de tratamiento disponible para el equipo de salud y para las personas con diabetes." },
    { value: 11, label: "11", description: "Nivel A:... se evalúan y documentan regularmente en forma estandarizada relacionadas a un plan de tratamiento disponible para el equipo de salud y para las personas con diabetes." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... es limitado a la distribución de información (folletos, trifoliares)." },
    { value: 1, label: "1", description: "Nivel D:... es limitado a la distribución de información (folletos, trifoliares)." },
    { value: 2, label: "2", description: "Nivel D:... es limitado a la distribución de información (folletos, trifoliares)." },
    { value: 3, label: "3", description: "Nivel C:... está disponible a través de referencia a clases de auto cuidado o a educadores especialistas en diabetes." },
    { value: 4, label: "4", description: "Nivel C:... está disponible a través de referencia a clases de auto cuidado o a educadores especialistas en diabetes." },
    { value: 5, label: "5", description: "Nivel C:... está disponible a través de referencia a clases de auto cuidado o a educadores especialistas en diabetes." },
    { value: 6, label: "6", description: "Nivel B:... lo proporcionan educadores clínicos entrenados y que están designados para apoyar el auto cuidado, coordinados con clínicas que ven a los pacientes referidos." },
    { value: 7, label: "7", description: "Nivel B:... lo proporcionan educadores clínicos entrenados y que están designados para apoyar el auto cuidado, coordinados con clínicas que ven a los pacientes referidos." },
    { value: 8, label: "8", description: "Nivel B:... lo proporcionan educadores clínicos entrenados y que están designados para apoyar el auto cuidado, coordinados con clínicas que ven a los pacientes referidos." },
    { value: 9, label: "9", description: "Nivel A:... se ofrece a través de educadores clínicos, entrenados en apoyar pacientes con enfermedades crónicas y enseñarles técnicas para resolver problemas." },
    { value: 10, label: "10", description: "Nivel A:... se ofrece a través de educadores clínicos, entrenados en apoyar pacientes con enfermedades crónicas y enseñarles técnicas para resolver problemas." },
    { value: 11, label: "11", description: "Nivel A:... se ofrece a través de educadores clínicos, entrenados en apoyar pacientes con enfermedades crónicas y enseñarles técnicas para resolver problemas." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... no es hecho sistemáticamente." },
    { value: 1, label: "1", description: "Nivel D:... no es hecho sistemáticamente." },
    { value: 2, label: "2", description: "Nivel D:... no es hecho sistemáticamente." },
    { value: 3, label: "3", description: "Nivel C:... se proporciona a pacientes y familiares a través de referencias médicas." },
    { value: 4, label: "4", description: "Nivel C:... se proporciona a pacientes y familiares a través de referencias médicas." },
    { value: 5, label: "5", description: "Nivel C:... se proporciona a pacientes y familiares a través de referencias médicas." },
    { value: 6, label: "6", description: "Nivel B:... es promulgado a través de grupos de apoyo, o apoyo individual y programas para educadores." },
    { value: 7, label: "7", description: "Nivel B:... es promulgado a través de grupos de apoyo, o apoyo individual y programas para educadores." },
    { value: 8, label: "8", description: "Nivel B:... es promulgado a través de grupos de apoyo, o apoyo individual y programas para educadores." },
    { value: 9, label: "9", description: "Nivel A:... es una parte integral de la atención de la diabetes que incluye la evaluación sistemática y rutinaria incluyendo grupos de apoyo, apoyo individual, y/o programas de consejera." },
    { value: 10, label: "10", description: "Nivel A:... es una parte integral de la atención de la diabetes que incluye la evaluación sistemática y rutinaria incluyendo grupos de apoyo, apoyo individual, y/o programas de consejera." },
    { value: 11, label: "11", description: "Nivel A:... es una parte integral de la atención de la diabetes que incluye la evaluación sistemática y rutinaria incluyendo grupos de apoyo, apoyo individual, y/o programas de consejera." }
  ];

  const optionsQ4 = [
    { value: 0, label: "0", description: "Nivel D:... no hay o no están disponibles." },
    { value: 1, label: "1", description: "Nivel D:... no hay o no están disponibles." },
    { value: 2, label: "2", description: "Nivel D:... no hay o no están disponibles." },
    { value: 3, label: "3", description: "Nivel C:... están limitados a la distribución de folletos, plegables, trifoliares y otros tipos de nota escrita." },
    { value: 4, label: "4", description: "Nivel C:... están limitados a la distribución de folletos, plegables, trifoliares y otros tipos de nota escrita." },
    { value: 5, label: "5", description: "Nivel C:... están limitados a la distribución de folletos, plegables, trifoliares y otros tipos de nota escrita." },
    { value: 6, label: "6", description: "Nivel B:... están disponibles solamente a través de referencias de centros especializados." },
    { value: 7, label: "7", description: "Nivel B:... están disponibles solamente a través de referencias de centros especializados." },
    { value: 8, label: "8", description: "Nivel B:... están disponibles solamente a través de referencias de centros especializados." },
    { value: 9, label: "9", description: "Nivel A:... están disponibles y forman una parte integral de la atención de la diabetes." },
    { value: 10, label: "10", description: "Nivel A:... están disponibles y forman una parte integral de la atención de la diabetes." },
    { value: 11, label: "11", description: "Nivel A:... están disponibles y forman una parte integral de la atención de la diabetes." }
  ];

  const totalScore = scores.q1 + scores.q2 + scores.q3 + scores.q4;
  const averageScore = totalScore / 4;

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
        <p className="text-xl">Área 3: Nivel de la práctica</p>
        <p>Varios componentes que se manifiestan al nivel de la práctica, de cada proveedor de salud, han demostrado que mejoran la atención a la diabetes.</p>
        <p className="text-xl top-2">Auto cuidado de la Diabetes Mellitus</p>
        <p>Programas efectivos de apoyo para el auto-cuidado de la diabetes para ayudar a las personas con diabetes y a la familia para adaptarse y aceptar los retos de vivir y manejar la diabetes y reducir síntomas y complicaciones.</p>

        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Evaluación y documentación de las necesidades y actividades del auto cuidado de la diabetes</Label>
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
              <Label htmlFor="question2">2. Apoyo al auto cuidado de la diabetes</Label>
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
              <Label htmlFor="question3">3. Apoyar las inquietudes de los pacientes y familiares</Label>
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
              <Label htmlFor="question3">4. Cambios del comportamiento y apoyo de grupo</Label>
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
          Puntuación Total del apoyo para el auto-cuidado de la diabetes: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
          Puntuación Promedio: (puntuación del apoyo del auto-cuidado/4): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
