import { saveAs } from "file-saver";
import { Button } from "@fluentui/react-components";
import { Packer } from "docx";
import { DocucmentoNuevo } from "./Datos";





export function Registro() {

    const generate = () => {
        const documentCreator = DocucmentoNuevo
        
        Packer.toBlob(documentCreator).then((blob) => {
            console.log(blob);
            saveAs(blob, "Registro.docx");
            console.log("Document created successfully");
        });
    };

    return (
        <div>
            <p>
                <Button onClick={generate}>Descargar Registro!</Button>
            </p>
        </div>
    );


}
