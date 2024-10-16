import {
    Document,
    Paragraph,
    TextRun,
    Tab
} from "docx";


export const NuevoDocucmento = new Document(
    {
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Hello World"),
                            new TextRun({
                                text: "Foo Bar",
                                bold: true,
                                size: 40,
                            }), 
                        
                            new TextRun({
                                children: [new Tab(), "Github is the best"],
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    }
);