import { Button } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocxRegEvalPost } from "./FucGenRegEvalPost";

interface DocxButtonProps {
    evalRegi_id: string;
}

const ButtonDocxPostRes: React.FC<DocxButtonProps> = ({ evalRegi_id }) => {
    return <Button onClick={()=>{generarDocxRegEvalPost(evalRegi_id)}} icon={<ArrowDownload20Regular />}>Descargar Evaluación</Button>;
};

export default ButtonDocxPostRes;
