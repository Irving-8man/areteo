import { Button } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocxRegistroMedico } from "./FucGenRegistroMedico";

interface DocxButtonProps {
    paciente_id: string;
    registro_id: string;
}

const ButtonDocxRegistro: React.FC<DocxButtonProps> = ({ paciente_id, registro_id }) => {

    return <Button onClick={()=>{generarDocxRegistroMedico(paciente_id,registro_id)}} icon={<ArrowDownload20Regular />}>Descargar Registro</Button>;
};

export default ButtonDocxRegistro;
