import { Route, Routes } from 'react-router-dom';

//Home
import Bienvendida from './ui/Bienvenida';
//Inicio
import Dashboard from './appViews/DashboardView';
import Inicio from './appViews/InicioView';
//Pacientes
import Pacientes from './appViews/PacientesView';
import ListaPacientes from './appViews/PacientesViews/ListaPacientesView';
import VisualizarPaciente from './appViews/PacientesViews/VisualizarPacienteView';
import DatosPacientes from './appViews/PacientesViews/DatosPacientesView';
import VerResulRegistro from './appViews/PacientesViews/VerResulRegistroView';
import CrearRegistro from './appViews/PacientesViews/CrearRegistroView';
//Instrumentos
import Instrumentos from './appViews/InstrumentosView';
import ListaInstrumentos from './appViews/InstrumentosViews/ListaInstrumentosView';
//Instrumento fijo
import InstrumentoFijo from './appViews/InstrumentosViews/InstrumentoFijoViews/InstrumentoFijoView';
import AreaEvaluacion from './appViews/InstrumentosViews/InstrumentoFijoViews/AreaEvaluacionView';
import AreaRespuesta from './appViews/InstrumentosViews/InstrumentoFijoViews/AreaRespuestaView';
import OpcionesInstrumento from './appViews/InstrumentosViews/InstrumentoFijoViews/OpcionesInstrumentoView';
import AreaListEval from './appViews/InstrumentosViews/InstrumentoFijoViews/AreaListEvalView';
//Analiticas
//import Analiticas from './dashboard/Analiticas';
//Perfil
import Perfil from './appViews/PerfilView';
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


