
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { dialog } from '@tauri-apps/api';

export default function CrearPlantilla() {
    return (
        <div>
            <h1>Crear plantilla</h1>
            <GenerateAndSaveTPL />
        </div>

    )
}


function GenerateAndSaveTPL() {
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
            Generar y guardar archivo .tpl
        </button>
    );
}

