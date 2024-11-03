import { Button, Label, Select } from "@fluentui/react-components";
import { useState } from "react";
import { z } from "zod";

const scoresSchema = z.object({
  q1: z.number().min(0).max(11),
  q2: z.number().min(0).max(11),
  q3: z.number().min(0).max(11),
  q4: z.number().min(0).max(11),
});

export default function AreaCuatro() {
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
    { value: 0, label: "0", description: "Nivel D:... no hay o no están disponibles." },
    { value: 1, label: "1", description: "Nivel D:... no hay o no están disponibles." },
    { value: 2, label: "2", description: "Nivel D:... no hay o no están disponibles." },
    { value: 3, label: "3", description: "Nivel C:... hay pero no están integradas en la atención de diabetes." },
    { value: 4, label: "4", description: "Nivel C:... hay pero no están integradas en la atención de diabetes." },
    { value: 5, label: "5", description: "Nivel C:... hay pero no están integradas en la atención de diabetes." },
    { value: 7, label: "6", description: "Nivel B:... hay y son apoyadas por la educación ofrecida a través de los equipos de trabajadores de la salud." },
    { value: 8, label: "7", description: "Nivel B:... hay y son apoyadas por la educación ofrecida a través de los equipos de trabajadores de la salud." },
    { value: 6, label: "8", description: "Nivel B:... hay y son apoyadas por la educación ofrecida a través de los equipos de trabajadores de la salud." },
    { value: 9, label: "9", description: "Nivel A:... hay y apoyan al equipo de salud y son parte de la atención a personas con diabetes a través de recordatorios y otros métodos para cambios del comportamiento." },
    { value: 10, label: "10", description: "Nivel A:... hay y apoyan al equipo de salud y son parte de la atención a personas con diabetes a través de recordatorios y otros métodos para cambios del comportamiento." },
    { value: 11, label: "11", description: "Nivel A:... hay y apoyan al equipo de salud y son parte de la atención a personas con diabetes a través de recordatorios y otros métodos para cambios del comportamiento." }
  ];

  const optionsQ2 = [
    { value: 0, label: "0", description: "Nivel D:... se ofrece primariamente a través de la referencia tradicional." },
    { value: 1, label: "1", description: "Nivel D:... se ofrece primariamente a través de la referencia tradicional." },
    { value: 2, label: "2", description: "Nivel D:... se ofrece primariamente a través de la referencia tradicional." },
    { value: 3, label: "3", description: "Nivel C:... se logra a través de especialistas para mejor la capacidad global para implementar las guías/normas de manejo." },
    { value: 4, label: "4", description: "Nivel C:... se logra a través de especialistas para mejor la capacidad global para implementar las guías/normas de manejo." },
    { value: 5, label: "5", description: "Nivel C:... se logra a través de especialistas para mejor la capacidad global para implementar las guías/normas de manejo." },
    { value: 6, label: "6", description: "Nivel B:... incluye influyentes especialistas así como designados a proveer entrenamiento al equipo de salud de atención primaria." },
    { value: 7, label: "7", description: "Nivel B:... incluye influyentes especialistas así como designados a proveer entrenamiento al equipo de salud de atención primaria." },
    { value: 8, label: "8", description: "Nivel B:... incluye influyentes especialistas así como designados a proveer entrenamiento al equipo de salud de atención primaria." },
    { value: 9, label: "9", description: "Nivel A:... incluye influyentes y especialistas que están designados a mejorar la atención primaria de la diabetes." },
    { value: 10, label: "10", description: "Nivel A:... incluye influyentes y especialistas que están designados a mejorar la atención primaria de la diabetes." },
    { value: 11, label: "11", description: "Nivel A:... incluye influyentes y especialistas que están designados a mejorar la atención primaria de la diabetes." }
  ];

  const optionsQ3 = [
    { value: 0, label: "0", description: "Nivel D:... se proporciona esporádicamente." },
    { value: 1, label: "1", description: "Nivel D:... se proporciona esporádicamente." },
    { value: 2, label: "2", description: "Nivel D:... se proporciona esporádicamente." },
    { value: 3, label: "3", description: "Nivel C:... se proporciona sistemáticamente mediante los métodos tradicionales." },
    { value: 4, label: "4", description: "Nivel C:... se proporciona sistemáticamente mediante los métodos tradicionales." },
    { value: 5, label: "5", description: "Nivel C:... se proporciona sistemáticamente mediante los métodos tradicionales." },
    { value: 6, label: "6", description: "Nivel B:... se proporciona usando métodos optimizados (Ej. Cursos acreditados o calificados)." },
    { value: 7, label: "7", description: "Nivel B:... se proporciona usando métodos optimizados (Ej. Cursos acreditados o calificados)." },
    { value: 8, label: "8", description: "Nivel B:... se proporciona usando métodos optimizados (Ej. Cursos acreditados o calificados)." },
    { value: 9, label: "9", description: "Nivel A:... incluye el entrenamiento de todos los equipos asistenciales incluyendo manejo de poblaciones de personas con diabetes y apoyo de auto cuidado." },
    { value: 10, label: "10", description: "Nivel A:... incluye el entrenamiento de todos los equipos asistenciales incluyendo manejo de poblaciones de personas con diabetes y apoyo de auto cuidado." },
    { value: 11, label: "11", description: "Nivel A:... incluye el entrenamiento de todos los equipos asistenciales incluyendo manejo de poblaciones de personas con diabetes y apoyo de auto cuidado." }
  ];

  const optionsQ4 = [
    { value: 0, label: "0", description: "Nivel D:... no se proporciona información." },
    { value: 1, label: "1", description: "Nivel D:... no se proporciona información." },
    { value: 2, label: "2", description: "Nivel D:... no se proporciona información." },
    { value: 3, label: "3", description: "Nivel C:... se hace por petición o a través de publicaciones." },
    { value: 4, label: "4", description: "Nivel C:... se hace por petición o a través de publicaciones." },
    { value: 5, label: "5", description: "Nivel C:... se hace por petición o a través de publicaciones." },
    { value: 6, label: "6", description: "Nivel B:... se hace a través de materiales educativos específicos para cada guía/norma clínica." },
    { value: 7, label: "7", description: "Nivel B:... se hace a través de materiales educativos específicos para cada guía/norma clínica." },
    { value: 8, label: "8", description: "Nivel B:... se hace a través de materiales educativos específicos para cada guía/norma clínica." },
    { value: 9, label: "9", description: "Nivel A:... incluye materiales específicos desarrollados para los pacientes donde se describen sus funciones en el logro y cumplimiento de las guías/normas." },
    { value: 10, label: "10", description: "Nivel A:... incluye materiales específicos desarrollados para los pacientes donde se describen sus funciones en el logro y cumplimiento de las guías/normas." },
    { value: 11, label: "11", description: "Nivel A:... incluye materiales específicos desarrollados para los pacientes donde se describen sus funciones en el logro y cumplimiento de las guías/normas." }
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
        <p className="text-xl">Área 4: Normas de atención de la Diabetes Mellitus</p>
        <p>El manejo efectivo de la diabetes asegura que el equipo de salud tenga acceso a información médica basada en evidencias para la atención y soporte de personas con diabetes. Esto incluye evidencias médicas y guías clínicas o protocolos, consultas con especialistas, educación para el equipo de salud que este disponible y facilitar información al equipo de salud acerca de tratamientos efectivos.</p>
        
        <ul className="mt-5">
          <li className="mb-5">
            <div className="flex flex-col max-w-[400px]">
              <Label htmlFor="question1">1. Guías/ normas de diabetes basadas en evidencias medicas</Label>
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
              <Label htmlFor="question2">2. Participación de los especialistas dentro del sistema de salud para el mejoramiento de la atención primaria de la diabetes</Label>
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
              <Label htmlFor="question3">3. Educación al equipo de salud de atención de la diabetes</Label>
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
              <Label htmlFor="question3">4. Informar a las personas con diabetes acerca de guías/normas medicas</Label>
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
          Puntuación total del diseño del sistema de atención de diabetes: <span className="font-semibold">{totalScore}</span>
          </p>
          <p className="text-gray-700 mb-4">
          Puntuación promedio (puntuación del diseño del sistema /4): <span className="font-semibold">{averageScore.toFixed(2)}</span>
          </p>
        </aside>
      )}
    </div>
  );
}
