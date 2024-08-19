import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

export default function CargarPlantilla() {
    return(
        <div>
             <h1>Cargar Plantillas</h1>
             <UploadAndDisplayJSON />
        </div>
       
    
    )
}


function UploadAndDisplayJSON() {
    const [jsonData, setJsonData] = useState(null);

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('File reading was aborted');
            reader.onerror = () => console.log('File reading has failed');
            reader.onload = () => {
                // Aquí obtienes el contenido del archivo
                const fileContent = reader.result;
                try {
                    // Intentamos parsear el contenido como JSON
                    const parsedData = JSON.parse(fileContent);
                    setJsonData(parsedData); // Guardamos los datos en el estado
                    console.log('Contenido del archivo:', parsedData);
                } catch (error) {
                    console.error('Error al parsear el JSON:', error);
                }
            };
            reader.readAsText(file);
        });
    };

    const { getRootProps, getInputProps,isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
        onDrop
    });

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragAccept && (<p>All files will be accepted</p>)}
        {isDragReject && (<p>Some files will be rejected</p>)}
        {!isDragActive && (<p>Drop some files here ...</p>)}
                <p>Arrastra y suelta un archivo TPL aquí, o haz clic para seleccionar uno</p>
            </div>

            {jsonData && (
                <div className="json-display mt-4 p-4 bg-gray-100 rounded">
                    <h3>Contenido del archivo JSON:</h3>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}