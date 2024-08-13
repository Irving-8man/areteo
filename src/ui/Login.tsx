import { Link } from "react-router-dom";
import { Input, Card, CardFooter, Button, InfoLabel } from "@fluentui/react-components";


export default function Login() {
    return (
        <main className="min-h-screen flex flex-col justify-start items-center gap-7">
            <div className="py-10">
                <h1 className="text-4xl font-medium">Bienvenido a ARETEO</h1>
            </div>

            <Card style={{ padding: "40px" }}>
                <div>
                    <p className="text-center font-bold text-[20px] pb-[30px]">Iniciar sesión</p>
                </div>
                <div className="flex flex-col items-center gap-[25px]">
                    <div className="flex-col">
                        <InfoLabel className="block">Usuario</InfoLabel>
                        <Input appearance="underline" />
                    </div>
                    <div>
                        <InfoLabel className="block">Contraseña</InfoLabel>
                        <Input appearance="underline" type="password" />
                    </div>
                </div>
                <CardFooter className="mt-[30px]">
                    <Button appearance="primary">Acceder</Button>
                    <Link to="/dashboard"><Button appearance="outline">Ir a Dashboard</Button></Link>
                </CardFooter>
            </Card>
        </main>
    )
}
