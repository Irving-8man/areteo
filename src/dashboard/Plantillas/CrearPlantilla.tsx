
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { dialog } from '@tauri-apps/api';

export default function CrearPlantilla() {
    return (
        <div>
            <h1>Crear plantilla</h1>
            <GenerateAndSaveTPLDesktop />
            <GenerateAndDownloadTPLBrowser />
        </div>

    )
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


