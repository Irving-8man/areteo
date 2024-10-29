import { exists, writeTextFile, createDir } from "@tauri-apps/api/fs";
import { join, appDataDir } from "@tauri-apps/api/path";

export async function guardarPantilla(nombre:string) {
    const dir = await join(await appDataDir(), 'plantillas');
    const file = await join(dir, `${nombre}.json`);

    if (!(await exists(dir))) {
        await createDir(dir);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any;

    if (!(await exists(file))) {
        data = {};
    } else {
        data = {};
    }

    data = {
        "nombre": "Instrumento 1",
        "descripcion": "Descripción del instrumento",
        "preguntas": [
            {
                "pregunta": "¿Pregunta 1?",
                "respuesta": "Sí"
            },
            {
                "pregunta": "¿Pregunta 2?",
                "respuesta": "No"
            }
        ]
    };

    // Escribe el archivo JSON en la carpeta especificada
    await writeTextFile(file, JSON.stringify(data));
    alert("guardado")
}
