import bcrypt from 'bcryptjs';

export async function hashPass(unHash: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(unHash, salt);
}

export async function verificarContrasenia(contrasenia: string, hash: string): Promise<boolean> {
    return bcrypt.compare(contrasenia, hash); // Compara la contraseña con el hash
}
