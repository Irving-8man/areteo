
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { dialog } from '@tauri-apps/api';
import { useState } from 'react';
import TextoCorto from './Formulario/TextoCorto';
import TextoLargo from './Formulario/TextoLargo';
import Numerico from './Formulario/Numerico';
import Fecha from './Formulario/Fecha';
import FechaHora from './Formulario/FechaHora';
import Hora from './Formulario/Hora';
import Desplegable from './Formulario/Desplegable';
import OpcionM from './Formulario/OpcionM';
import CasillaV from './Formulario/CasillasV';
import Escala from './Formulario/Escala';
import RangoCorto from './Formulario/RangoCorto';
import RangoLargo from './Formulario/RangoLargo';
import MatrizOpciones from './Formulario/MatrizOpciones';
import Titulo from './Formulario/Titulo';
import React from 'react';
import { makeStyles } from '@fluentui/react-components';


type QuestionType = 'TextoCorto' | 'TextoLargo' | 'Numerico' | 'Fecha' | 'FechaHora' | 'Hora' | 'Desplegable' | 'OpcionM' | 'CasillaV' | 'Escala' | 'RangoCorto' | 'RangoLargo' | 'MatrizOpciones';

const components: Record<QuestionType, React.FC> = {
    TextoCorto,
    TextoLargo,
    Numerico,
    Fecha,
    Hora,
    FechaHora,
    Desplegable,
    OpcionM,
    CasillaV,
    Escala,
    RangoCorto,
    RangoLargo,
    MatrizOpciones,
};

const useStyles = makeStyles({
    container: {
        padding: '2vw', 
    },
    titleContainer: {
        marginTop: '2vh', 
        marginBottom: '2vh', 
    },
    questionBox: {
        display: 'flex',
        alignItems: 'flex-start',
        border: '1px solid #ccc',
        padding: '1vw', 
        marginBottom: '2vh',  
        borderRadius: '4px',
        width: '75%', 
        minWidth: '250px', 
    },
    questionContent: {
        marginLeft: '1vw', 
        marginTop: '1vh', 
        marginBottom: '1vh', 
        flex: 1,
    },
    typeSelector: {
        marginLeft: '1vw', 
    },
    addButton: {
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        padding: '1vh 2vw',  
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#4cae4c',
        },
        marginBottom: '2vh', 
    },
    removeButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '1vh 14.8vw',  
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#c9302c',
        },
        marginTop: '1vh', 
    },
    menuContainer: {
        position: 'fixed',
        top: '17.5vh',  
        left: '78%', 
        border: '1px solid #ccc',
        padding: '2vw', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '20vw', 
    },
    questionInput: {
        width: '100%',
        padding: '1vh',  
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '1vh',  
        marginTop: '1vh',  
    },
});

export default function CrearPlantilla() {
    const [questions, setQuestions] = useState<{ type: QuestionType, text: string }[]>([
        { type: 'TextoCorto', text: '' } 
    ]);
    
    const addQuestion = () => {
        setQuestions([...questions, { type: 'TextoCorto', text: '' }]); 
    };

    const removeQuestion = (index: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, i) => i !== index));
        }
    };

    const handleTypeChange = (index: number, type: QuestionType) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].type = type;
        setQuestions(updatedQuestions);
    };

    const handleTextChange = (index: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].text = text;
        setQuestions(updatedQuestions);
    };

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Titulo />
            </div>
            <h2>Diseña tu cuestionario aquí</h2> <br/>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 2 }}>
                    {questions.map((question, index) => (
                        <div key={index} className={styles.questionBox}>
                            <div className={styles.questionContent}>
                                <label>Pregunta:</label>
                                <input
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                    placeholder="Escribe la pregunta aquí"
                                    className={styles.questionInput}
                                />
                                {React.createElement(components[question.type])}
                                {questions.length > 1 && (
                                    <button 
                                        onClick={() => removeQuestion(index)} 
                                        className={styles.removeButton}>
                                        Eliminar Pregunta
                                    </button>
                                )}
                            </div>
                            <div className={styles.typeSelector}>
                                <label>Tipo de pregunta:</label>
                                <select 
                                    onChange={(e) => handleTypeChange(index, e.target.value as QuestionType)}
                                    value={questions[index].type}
                                    style={{ marginBottom: '10px' }}
                                >
                                    <option value="TextoCorto">Texto Corto</option>
                                    <option value="TextoLargo">Texto Largo</option>
                                    <option value="Numerico">Numerico</option>
                                    <option value="FechaHora">Fecha y Hora</option>
                                    <option value="Fecha">Fecha</option>
                                    <option value="Hora">Hora</option>
                                    <option value="Desplegable">Desplegable</option>
                                    <option value="OpcionM">Opción Múltiple</option>
                                    <option value="CasillaV">Casillas de Verificación</option>
                                    <option value="Escala">Escala</option>
                                    <option value="RangoCorto">Rango Corto</option>
                                    <option value="RangoLargo">Rango Largo</option>
                                    <option value="MatrizOpciones">Matriz de Opciones</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.menuContainer}>
                    <h3>Menú de Encuesta</h3>
                    <button onClick={addQuestion} className={styles.addButton}>Agregar Pregunta</button>
                </div>
            </div>
            <GenerateAndSaveTPLDesktop />
            <GenerateAndDownloadTPLBrowser />
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


