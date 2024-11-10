import { Avatar, Card } from "@fluentui/react-components";
type AvatarColor = "neutral" | "brand" | "colorful" | "light-teal" | "red" | "dark-green" | "navy" | "platinum";

interface Color {
    edad: number;
    backgroundColor: AvatarColor; // Asegúrate de que sea uno de los colores permitidos
    sign: string;
    condicion: string;
}

const COLORES: Color[] = [
    {
        edad: 12,
        backgroundColor: "light-teal",
        sign: "Infancia",
        condicion: "Menor o igual a 12 años"
    },
    {
        edad: 18,
        backgroundColor: "red",
        sign: "Adolescencia",
        condicion: "Menor o igual a 18 años"
    }, {
        edad: 35,
        backgroundColor: "dark-green",
        sign: "Adultez temprana",
        condicion: "Menor o igual a 35 años"
    }, {
        edad: 60,
        backgroundColor: "navy",
        sign: " Adultez media",
        condicion: "Menor o igual a 60 años"
    }, {
        edad: 61,
        backgroundColor: "platinum",
        sign: "Vejez",
        condicion: "Mayor a 60 años"
    }
]

export default function InfoPacientes({ pacientes }: { pacientes: number }) {

    return (
        <article>

            <Card style={{ padding: "25px" }}>
                <div className="flex justify-between">
                    <h1 className="font-medium text-2xl mb-2">Información</h1><p className="font-semibold text-lg mb-6 capitalize">Total de pacientes registrados: <span className="text-red-600 font-medium">{pacientes}</span></p>
                </div>

                <div className="flex justify-between">

                    <div>
                        <p className="font-normal text-base mb-10">Colores para identificar el rango de edad de los pacientes: </p>
                        <ul className="grid grid-cols-5 gap-10">
                            {
                                COLORES.map((colore, idx) => (
                                    <li key={idx} className="flex flex-col items-center">
                                        <Avatar
                                            style={{ width: "25px", height: "25px", }}
                                            aria-label="persona"
                                            name="persona"
                                            color={colore.backgroundColor}
                                        />

                                        <div>
                                            <p>{colore.condicion}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </Card>

        </article>
    )
}
