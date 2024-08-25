
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { dialog } from '@tauri-apps/api';
import { useState } from 'react';


export default function CrearPlantilla() {
    return (
        <div>
            <Formulario />
            <GenerateAndSaveTPLDesktop />
            <GenerateAndDownloadTPLBrowser />
        </div>

    )
}

function Formulario() {
    // Estado para almacenar las preguntas y sus detalles
    const [questions, setQuestions] = useState<any[]>([
        { type: 'text', questionText: '', options: ['', ''], date: '', scaleMin: '0', scaleMax: '10', labelMin: '', labelMax: '' }
    ]);
    // Estado para el título y subtítulo del formulario
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');

    // Función para agregar una nueva pregunta al formulario
    const addQuestion = () => {
        setQuestions([...questions, { type: 'text', questionText: '', options: ['', ''], date: '', scaleMin: '0', scaleMax: '10', labelMin: '', labelMax: '' }]);
    };

    // Función para manejar los cambios en el texto de la pregunta
    const handleQuestionTextChange = (index: number, text: string) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = text;
        setQuestions(newQuestions);
    };

    // Función para manejar los cambios en el tipo de pregunta
    const handleTypeChange = (index: number, type: string) => {
        const newQuestions = [...questions];
        newQuestions[index].type = type;

        // Inicializa con dos opciones para tipos de preguntas que las requieren
        if (type === 'multipleChoice' || type === 'checkbox' || type === 'dropdown') {
            newQuestions[index].options = newQuestions[index].options.length >= 2 ? newQuestions[index].options.slice(0, 2) : ['', ''];
        } else if (type === 'date') {
            newQuestions[index].date = ''; // Limpia el valor de la fecha cuando se cambia el tipo
        } else if (type === 'scale') {
            newQuestions[index].scaleMin = '0'; // Valor por defecto para la escala mínima
            newQuestions[index].scaleMax = '10'; // Valor por defecto para la escala máxima
            newQuestions[index].labelMin = ''; // Etiqueta por defecto vacía para la escala mínima
            newQuestions[index].labelMax = ''; // Etiqueta por defecto vacía para la escala máxima
        } else {
            newQuestions[index].options = []; // Limpia las opciones para otros tipos de preguntas
        }
        setQuestions(newQuestions);
    };

    // Función para manejar los cambios en una opción de pregunta
    const handleOptionChange = (index: number, optionIndex: number, optionText: string) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = optionText;
        setQuestions(newQuestions);
    };

    // Función para manejar los cambios en la fecha
    const handleDateChange = (index: number, date: string) => {
        const newQuestions = [...questions];
        newQuestions[index].date = date;
        setQuestions(newQuestions);
    };

    // Función para manejar los cambios en la escala
    const handleScaleChange = (index: number, minOrMax: 'min' | 'max' | 'labelMin' | 'labelMax', value: string) => {
        const newQuestions = [...questions];
        if (minOrMax === 'min') {
            newQuestions[index].scaleMin = value;
        } else if (minOrMax === 'max') {
            newQuestions[index].scaleMax = value;
        } else if (minOrMax === 'labelMin') {
            newQuestions[index].labelMin = value;
        } else {
            newQuestions[index].labelMax = value;
        }
        setQuestions(newQuestions);
    };

    // Función para agregar una opción a una pregunta
    const addOption = (index: number) => {
        const newQuestions = [...questions];
        if (newQuestions[index].type === 'multipleChoice' || newQuestions[index].type === 'checkbox' || newQuestions[index].type === 'dropdown') {
            newQuestions[index].options.push('');
        }
        setQuestions(newQuestions);
    };

    // Función para eliminar una opción de una pregunta
    const removeOption = (index: number, optionIndex: number) => {
        const newQuestions = [...questions];
        if (newQuestions[index].options.length > 2) {
            newQuestions[index].options.splice(optionIndex, 1);
        }
        setQuestions(newQuestions);
    };

    // Función para eliminar una pregunta del formulario
    const removeQuestion = (index: number) => {
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.splice(index, 1);
            setQuestions(newQuestions);
        }
    };

    return (
        <div>
            {/* Recuadro para el título y subtítulo del formulario */}
            <div className="border border-pink-500 p-4 mb-6 bg-gray-100 rounded-md">
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md font-bold"
                />
                <input
                    type="text"
                    placeholder="Subtítulo (opcional)"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            {/* Renderiza las preguntas */}
            {questions.map((question, index) => (
                <div key={index} className="border border-pink-500 p-4 mb-4 bg-gray-100 rounded-md flex flex-col">
                    <div className="flex">
                        <div className="w-2/3 pr-4">
                            {/* Campo para el texto de la pregunta */}
                            <input
                                type="text"
                                placeholder="Escribe tu pregunta"
                                value={question.questionText}
                                onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                                className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                            />

                            {/* Renderiza la respuesta dependiendo del tipo de pregunta */}
                            {question.type === 'text' && (
                                <textarea
                                    placeholder="Escribe tu respuesta"
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md h-24"
                                />
                            )}
                            {question.type === 'date' && (
                                <input
                                    type="date"
                                    value={question.date}
                                    onChange={(e) => handleDateChange(index, e.target.value)}
                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                />
                            )}
                            {(question.type === 'multipleChoice' || question.type === 'checkbox' || question.type === 'dropdown') && (
                                <div>
                                    <p className="mb-2 font-semibold">Opciones</p>
                                    {/* Renderiza las opciones de la pregunta */}
                                    {question.options.map((option: string, optionIndex: number) => (
                                        <div key={optionIndex} className="mb-2 flex items-center">
                                            {/* Renderiza iconos según el tipo de pregunta */}
                                            {question.type === 'multipleChoice' && (
                                                <span className="mr-2 w-4 h-4 rounded-full border border-gray-400"></span>
                                            )}
                                            {question.type === 'checkbox' && (
                                                <span className="mr-2 w-4 h-4 border border-gray-400"></span>
                                            )}
                                            {question.type === 'dropdown' && (
                                                <span className="mr-2">{optionIndex + 1}.</span>
                                            )}
                                            <input
                                                type="text"
                                                placeholder={`Opción ${optionIndex + 1}`}
                                                value={option}
                                                onChange={(e) =>
                                                    handleOptionChange(index, optionIndex, e.target.value)
                                                }
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                            {/* Botón para eliminar opciones si hay más de dos */}
                                            {question.options.length > 2 && optionIndex >= 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(index, optionIndex)}
                                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                                                >
                                                    Eliminar opción
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {/* Botón para agregar una nueva opción */}
                                    <button type="button" onClick={() => addOption(index)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                                        Agregar opción
                                    </button>
                                </div>
                            )}
                            {question.type === 'scale' && (
                                <div className="mt-2">
                                    {/* Configuración de la escala */}
                                    <div className="mb-2 flex items-center">
                                        <div className="w-1/2 pr-2">
                                            <label className="mr-2">Valor mínimo:</label>
                                            <select
                                                value={question.scaleMin}
                                                onChange={(e) => handleScaleChange(index, 'min', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <label className="mr-2">Valor máximo:</label>
                                            <select
                                                value={question.scaleMax}
                                                onChange={(e) => handleScaleChange(index, 'max', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            >
                                                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                                                    <option key={val} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-1/2 pr-2">
                                            <input
                                                type="text"
                                                placeholder="Muy bueno"
                                                value={question.labelMin}
                                                onChange={(e) => handleScaleChange(index, 'labelMin', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                        <div className="w-1/2 pl-2">
                                            <input
                                                type="text"
                                                placeholder="Muy malo"
                                                value={question.labelMax}
                                                onChange={(e) => handleScaleChange(index, 'labelMax', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-1/3 pl-4">
                            <p className="mb-2 font-semibold">Tipo de pregunta</p>
                            <select
                                value={question.type}
                                onChange={(e) => handleTypeChange(index, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="text">Texto</option>
                                <option value="multipleChoice">Opción múltiple</option>
                                <option value="checkbox">Casillas de Verificación</option>
                                <option value="date">Fecha</option>
                                <option value="number">Número</option>
                                <option value="dropdown">Desplegable</option>
                                <option value="scale">Escala</option>
                            </select>
                        </div>
                    </div>
                    {/* Botón para eliminar la pregunta si hay más de una */}
                    {questions.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Eliminar pregunta
                        </button>
                    )}
                </div>
            ))}
            {/* Botón para agregar una nueva pregunta al formulario */}
            <button type="button" onClick={addQuestion} className="px-4 py-2 bg-green-500 text-white rounded-md">
                Agregar pregunta
            </button>
        </div>
    );
}
function GenerateAndSaveTPLDesktop() {
    const generateFile = async () => {
        const data = {
            // Aquí coloca la estructura JSON que deseas guardar
            nombre: "Instrumento 1",
            descripcion: "Descripción del instrumento",
            preguntas: [
                { pregunta: "¿Pregunta 1?", respuesta: "Sí" },
                { pregunta: "¿Pregunta 2?", respuesta: "No" },
            ]
        };

        // Convertir el JSON a un string
        const jsonString = JSON.stringify(data, null, 2);

        try {
            // Abre un diálogo para que el usuario elija dónde guardar el archivo
            const selectedPath = await dialog.save({
                defaultPath: `${BaseDirectory.Desktop}/instrumento.tpl`, // Directorio de Descargas
                filters: [{
                    name: 'TPL Files',
                    extensions: ['tpl'] // Asegura que la extensión sea .tpl
                }]
            });

            if (selectedPath) {
                // Asegura que la ruta tenga la extensión .tpl
                const finalPath = selectedPath.endsWith('.tpl') ? selectedPath : `${selectedPath}.tpl`;

                // Guardar el archivo en la ruta seleccionada con la extensión .tpl
                await writeTextFile(finalPath, jsonString);
                alert('Archivo guardado con éxito en: ' + finalPath);
            }
        } catch (err) {
            console.error('Error al guardar el archivo:', err);
        }
    };

    return (
        <button onClick={generateFile}>
            Generar y guardar archivo .tpl desktop
        </button>
    );
}




function GenerateAndDownloadTPLBrowser() {
    const generateFile = () => {
        const data = {
            // Aquí coloca la estructura JSON que deseas guardar
            nombre: "Instrumento 1",
            descripcion: "Descripción del instrumento",
            preguntas: [
                { pregunta: "¿Pregunta 1?", respuesta: "Sí" },
                { pregunta: "¿Pregunta 2?", respuesta: "No" },
            ]
        };

        // Convertir el JSON a un string
        const jsonString = JSON.stringify(data, null, 2);

        // Crear un blob con el contenido del archivo
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'instrumento2.tpl';
        document.body.appendChild(link);
        link.click();

        // Limpiar el enlace temporal
        document.body.removeChild(link);
    };

    return (
        <button onClick={generateFile}>
            Generar y descargar archivo .tpl browser
        </button>
    );
}


