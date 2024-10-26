import { exists, writeTextFile } from "@tauri-apps/api/fs"
import { join,appDataDir } from "@tauri-apps/api/path"

export async function guardarPantilla() {
    const file = await join(await appDataDir(), 'plantilla.json')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any
    if (!(await exists(file))) {
        data = {}
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
    }

    await writeTextFile(file, JSON.stringify(data))
}