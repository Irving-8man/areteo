import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export function generarID(): string {
    return uuidv4();
}

// Método para verificar si una cadena es un UUID válido
export function isValidoID(id: string): boolean {
    return uuidValidate(id);
}
