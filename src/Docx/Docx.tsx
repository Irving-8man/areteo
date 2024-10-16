import { saveAs } from "file-saver";
import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { NuevoDocucmento } from "./generador";





export function Docx() {

    const generate = () => {
        const documentCreator = NuevoDocucmento
        
        Packer.toBlob(documentCreator).then((blob) => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    };

    return (
        <div>
            <p>
                <Button onClick={generate}>Generate CV with docx!</Button>
            </p>
        </div>
    );
}
