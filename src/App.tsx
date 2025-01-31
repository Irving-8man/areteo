import { Route, Routes } from 'react-router-dom';

//Home
import Bienvendida from './ui/Bienvenida';
//Inicio
import Dashboard from './dashboardViews/Dashboard';
import Inicio from './dashboardViews/Inicio';
//Pacientes
import Pacientes from './dashboardViews/Pacientes';
import ListaPacientes from './dashboardViews/Pacientes/ListaPacientes';
import VisualizarPaciente from './dashboardViews/Pacientes/VisualizarPaciente';
import DatosPacientes from './dashboardViews/Pacientes/DatosPacientes';
import VerResulRegistro from './dashboardViews/Pacientes/VerResulRegistro';
import CrearRegistro from './dashboardViews/Pacientes/CrearRegistro';
//Instrumentos
import Instrumentos from './dashboardViews/Instrumentos';
import ListaInstrumentos from './dashboardViews/Instrumentos/ListaInstrumentos';
//Instrumento fijo
import InstrumentoFijo from './dashboardViews/Instrumentos/InstrumentoFijo/InstrumentoFijo';
import AreaEvaluacion from './dashboardViews/Instrumentos/InstrumentoFijo/AreaEvaluacion';
import AreaRespuesta from './dashboardViews/Instrumentos/InstrumentoFijo/AreaRespuesta';
import OpcionesInstrumento from './dashboardViews/Instrumentos/InstrumentoFijo/OpcionesInstrumento';
import AreaListEval from './dashboardViews/Instrumentos/InstrumentoFijo/AreaListEval';
//Analiticas
//import Analiticas from './dashboard/Analiticas';
//Perfil
import Perfil from './dashboardViews/Perfil';
//Proteccion de rutas
import RutaProtegida from './ui/RutaProtegida';
//Contexto login
import { SesionProvider } from './context/SesionContext';



export default function App() {
    return (
        <>
            <SesionProvider>
                <Routes>
                    <Route path='/' element={<Bienvendida />} />
                    <Route path='/dashboard' element={<RutaProtegida><Dashboard /></RutaProtegida>}>
                        <Route index element={<Inicio />} />
                        <Route path='pacientes' element={<Pacientes />} >
                            <Route index element={<ListaPacientes />} />
                            <Route path=':id' element={<VisualizarPaciente />} />
                            <Route path=':id/crear-registro' element={<CrearRegistro />} />
                            <Route path='datos-pacientes' element={<DatosPacientes />} />
                            <Route path=':id/result-registro/:idRegis' element={<VerResulRegistro />} />
                        </Route>
                        <Route path='instrumentos' element={<Instrumentos />} >
                            <Route index element={<ListaInstrumentos />} />
                            <Route path='instrumentoFijo' element={<InstrumentoFijo />} >
                                <Route index element={<OpcionesInstrumento />} />
                                <Route path='area/:areaId' element={<AreaListEval />} />
                                <Route path='area/:areaId/evaluar' element={<AreaEvaluacion />} />
                                <Route path='resultados/:areaId/:respID' element={<AreaRespuesta />} />
                            </Route>
                        </Route>

                        <Route path='perfil' element={<Perfil />} />
                    </Route>

                </Routes>
            </SesionProvider>
        </>
    )
}


