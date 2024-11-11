export function calcularEdad(fechaNacimiento: string | undefined): { valor: number, texto: string } {
    let valor = 0;
    let texto = "0 años";

    if (fechaNacimiento) {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        const diffAnios = hoy.getFullYear() - nacimiento.getFullYear();
        const diffMeses = hoy.getMonth() - nacimiento.getMonth();
        const diffDias = hoy.getDate() - nacimiento.getDate();

        // Verifica si el cumpleaños de este año no ha pasado y ajusta el cálculo de años
        if (diffMeses < 0 || (diffMeses === 0 && diffDias < 0)) {
            valor = diffAnios - 1;
        } else {
            valor = diffAnios;
        }

        // Genera el texto en años o meses, sin afectar el valor numérico en años
        if (valor >= 1) {
            texto = `${valor} ${valor === 1 ? "año" : "años"}`;
        } else {
            const meses = (diffAnios * 12) + diffMeses - (diffDias < 0 ? 1 : 0);
            texto = `${meses} ${meses === 1 ? "mes" : "meses"}`;
        }
    }

    return { valor, texto };
}
