import { fetch, Response } from "@tauri-apps/api/http";
import { Button } from "react-bootstrap";
import React, {useState, useEffect} from 'react';
import Vistaweb from "./Vistaweb";
import { Document } from "@react-pdf/renderer";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

function gene(){
    const [poema, setPoema] = useState(null);
    const [verWeb, setVerWeb] = useState(false);
    const [verPDF, setVerPDF = useState(false);

    function fetchPoema(){
        fetch("http://localhost:5173/dashboard/analiticas")
        .then((Response) => Response.json())
        .then((data) => {
            setPoema(data[0]);
        });
    }

    React.useEffect(() => {
        fetchPoema();
    }, []);

    const Menu = () =>{
        
        return(

        <nav>
            <Button onClick={()=>{
                setVerWeb(!verWeb);
                setVerPDF(false);
            }}>
                {verWeb ? "Ocultar web" : "Ver Web" }</Button>
            <Button onClick={()=> {
                setVerWeb(false);
                setVerPDF(!verPDF);
            }}>

            {verPDF ? "Ocultar PDF" : "Ver PDF"}</Button>

            <PDFDownloadLink document={<Document poema={poema}/>} fileName="poema.pdf">

            <Button>Descargar pdf</Button>

            </PDFDownloadLink>
            
        </nav>
        );
    };


    return(
        <div style={{minHeight:"100vh"}}>
            <Menu/>
    {poema ?(          
            <>
          {verWeb ? <Vistaweb poema={poema}/> : null}
          {verPDF ? (<PDFViewer style={{width:"100%", height: "90vh" }}> 
            <Document poema={poema}/>
            </PDFViewer>
        ) : null}
            </>
    ) : null}
        </div>
        );

}
export default gene;