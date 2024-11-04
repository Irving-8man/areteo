import { Route, Routes } from 'react-router-dom';
//Home
import Bienvendida from './ui/Bienvenida';
//Inicio
import Dashboard from './dashboard/Dashboard';
import Inicio from './dashboard/Inicio';
//Pacientes
import Pacientes from './dashboard/Pacientes';
import ListaPacientes from './dashboard/Pacientes/ListaPacientes';
import VisualizarPaciente from './dashboard/Pacientes/VisualizarPaciente';
import DatosPacientes from './dashboard/Pacientes/DatosPacientes';
import VerResulRegistro from './dashboard/Pacientes/VerResulRegistro';
import CrearRegistro from './dashboard/Pacientes/CrearRegistro';
//Instrumentos
import Instrumentos from './dashboard/Instrumentos';
import ListaInstrumentos from './dashboard/Instrumentos/ListaInstrumentos';
//Instrumento fijo
import InstrumentoFijo from './dashboard/Instrumentos/InstrumentoFijo/InstrumentoFijo';
import AreaEvaluacion from './dashboard/Instrumentos/InstrumentoFijo/AreaEvaluacion';
import AreaResultados from './dashboard/Instrumentos/InstrumentoFijo/AreaResultados';
import AreaRespuesta from './dashboard/Instrumentos/InstrumentoFijo/AreaRespuesta';
import OpcionesInstrumento from './dashboard/Instrumentos/InstrumentoFijo/OpcionesInstrumento';
//Plantillas
import Plantillas from './dashboard/Plantillas';
import ListaPlantillas from './dashboard/Plantillas/ListaPlantillas';
import CargarPlantilla from './dashboard/Plantillas/CargarPlantilla';
import CrearPlantilla from './dashboard/Plantillas/CrearPlantilla';
//Analiticas
import Analiticas from './dashboard/Analiticas';
//Almacenamiento
import Almacenamiento from './dashboard/Almacenamiento';
//Proteccion de rutas
import RutaProtegida from './ui/RutaProtegida';
//Contexto login
import { SesionProvider } from './context/SesionContext';
import VisualizarPlantilla from './dashboard/Plantillas/VisualizarPlantilla';





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
              <Route path=':id' element={<VisualizarPaciente/>} />
              <Route path=':id/crear-registro' element={<CrearRegistro />} />
              <Route path='datos-pacientes' element={<DatosPacientes />} />
              <Route path=':id/result-registro/:idRegis' element={<VerResulRegistro/>} />
            </Route>

            <Route path='instrumentos' element={<Instrumentos />} >
              <Route index element={<ListaInstrumentos />} /> 

              <Route path='instrumentoFijo' element={<InstrumentoFijo />} >
                  <Route index element={<OpcionesInstrumento />} /> 
                  <Route path='area/:areaId' element={<AreaResultados />} />
                  <Route path='area/:areadId/evaluar' element={<AreaEvaluacion />} />
                  <Route path='resultados/:areadId/:respID' element={<AreaRespuesta />} />
              </Route>
            </Route>


            <Route path='analiticas' element={<Analiticas />} />
            <Route path='almacenamiento' element={<Almacenamiento />} />

            {/**PAuta */}
            <Route path='plantillas' element={<Plantillas />} >
              <Route index element={<ListaPlantillas />} />
              <Route path='crear-plantilla' element={<CrearPlantilla />} />
              <Route path='cargar-plantilla' element={<CargarPlantilla />} />
              <Route path=':id' element={<VisualizarPlantilla />} />
            </Route>
          </Route>
        </Routes>
      </SesionProvider>
    </>
  )
}


