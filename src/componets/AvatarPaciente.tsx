import { Avatar } from "@fluentui/react-components";

function obtenerColorEdad(fechaNacimiento: string) {
    const edad = new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();

    if (edad <= 12) return 'light-teal'; // Infancia
    if (edad <= 18) return 'cornflower'; // Adolescencia
    if (edad <= 35) return 'dark-green'; // Adultez temprana
    if (edad <= 60) return 'navy'; // Adultez media
    return 'platinum';                 // Vejez
}

interface propsI {
    label: string;
    name: string;
    fechaNacimiento: string;
}

export function AvatarPaciente(props: propsI) {
    const backgroundColor = obtenerColorEdad(props.fechaNacimiento);

    return (
        <Avatar
            aria-label={props.label}
            name={props.label}
            color={backgroundColor}
        />
    );
}
