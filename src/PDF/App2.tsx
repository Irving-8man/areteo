import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function App2(){
    return(
        <div>
            <PDFDownloadLink document={<PDF/>} fileName="primerpdf.pdf">
            {
                ({loading}) => loading ? <button>
                    cargando documento ...
                </button> : <button> Descarga </button>
            }
            
            </PDFDownloadLink>
        </div>
    )
}
export default App2;