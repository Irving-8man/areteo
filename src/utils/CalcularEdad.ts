export function calcularEdad(fechaNacimiento: string | undefined): { valor: number, texto: string } {
    if (!fechaNacimiento) return { valor: 0, texto: "0 años" };

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento + "T00:00:00Z"); // Fuerza UTC

    // Métodos UTC
    const nacimientoYear = nacimiento.getUTCFullYear();
    const hoyYear = hoy.getUTCFullYear();
    const nacimientoMonth = nacimiento.getUTCMonth();
    const hoyMonth = hoy.getUTCMonth();
    const nacimientoDia = nacimiento.getUTCDate();
    const hoyDia = hoy.getUTCDate();

    let edad = hoyYear - nacimientoYear;

    // Ajustar si el cumpleaños no ha ocurrido este año (en UTC)
    if (hoyMonth < nacimientoMonth || (hoyMonth === nacimientoMonth && hoyDia < nacimientoDia)) {
        edad--;
    }

    // Texto según edad
    if (edad >= 1) {
        return { valor: edad, texto: `${edad} ${edad === 1 ? "año" : "años"}` };
    } else {
        // Cálculo de meses restantes
        let meses = hoyMonth - nacimientoMonth;
        if (hoyDia < nacimientoDia) meses--;
        if (meses < 0) meses += 12;
        return { valor: 0, texto: `${meses} ${meses === 1 ? "mes" : "meses"}` };
    }
}