import { Avatar } from "@fluentui/react-components";

function obtenerColorEdad(edad:number) {

    if (edad <= 12) return 'light-teal'; // Infancia
    if (edad <= 18) return 'red'; // Adolescencia
    if (edad <= 35) return 'dark-green'; // Adultez temprana
    if (edad <= 60) return 'navy'; // Adultez media
    return 'platinum';                 // Vejez
}

interface propsI {
    label: string;
    name: string;
    edad: number;
}

export function AvatarPaciente(props: propsI) {
    const backgroundColor = obtenerColorEdad(props.edad);

    return (
        <Avatar
            aria-label={props.label}
            name={props.label}
            color={backgroundColor}
        />
    );
}
