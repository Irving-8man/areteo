import { saveAs } from "file-saver";
import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { NuevoDocucmento } from "./generador";





export function Docx() {

    const generate = () => {
        const documentCreator = NuevoDocucmento
        
        Packer.toBlob(documentCreator).then((blob) => {
            console.log(blob);
            saveAs(blob, "Expediente.docx");
            console.log("Document created successfully");
        });
    };

    return (
        <div>
            <p>
                <Button onClick={generate}>Descargar Expediente!</Button>
            </p>
        </div>
    );


}
