export function calcularEdad(fechaNacimiento: string | undefined): number {
    let edad = 0;
    if (fechaNacimiento) {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        // Verifica si no ha pasado el cumpleaños de este año
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
    }

    return edad;
}