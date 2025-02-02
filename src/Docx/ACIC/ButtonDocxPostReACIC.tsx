import { Button } from "@fluentui/react-components";
import { ArrowDownload20Regular } from "@fluentui/react-icons";
import { generarDocxRegEvalPost } from "@/Docx/FucGenRegEvalPost";

interface DocxButtonProps {
    evalRegi_id: string;
}
//Se encuentra posterior a responder el ACIC debado
const ButtonDocxPostReACIC: React.FC<DocxButtonProps> = ({ evalRegi_id }) => {
    return <Button onClick={()=>{generarDocxRegEvalPost(evalRegi_id)}} icon={<ArrowDownload20Regular />}>Descargar Evaluación</Button>;
};

export default ButtonDocxPostReACIC;
