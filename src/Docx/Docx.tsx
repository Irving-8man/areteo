import { saveAs } from "file-saver";
import { Packer } from "docx";
import { experiences, education, skills, achievements } from "./data";
import { DocumentCreator } from "./generador";

export function Docx() {

    const generate = () => {
        const documentCreator = new DocumentCreator();
        const doc = documentCreator.create([experiences, education, skills, achievements]);

        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    };

    return (
        <div>
            <p>
                Start editing to see some magic happen :)
                <button onClick={generate}>Generate CV with docx!</button>
            </p>
        </div>
    );
}
