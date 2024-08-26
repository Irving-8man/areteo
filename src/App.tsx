import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
//Home
import Login from './ui/Login';

//Inicio
import Dashboard from './dashboard/Dashboard';
import Inicio from './dashboard/Inicio';

//Pacientes
import Pacientes from './dashboard/Pacientes';
import ListaPacientes from './dashboard/Pacientes/ListaPacientes';
import RegistrarPaciente from './dashboard/Pacientes/RegistrarPaciente';

//Instrumentos
import Instrumentos from './dashboard/Instrumentos';

//Plantillas
import Plantillas from './dashboard/Plantillas';
import ListaPlantillas from './dashboard/Plantillas/ListaPlantillas';
import CargarPlantilla from './dashboard/Plantillas/CargarPlantilla';
import CrearPlantilla from './dashboard/Plantillas/CrearPlantilla';

//Analiticas
import Analiticas from './dashboard/Analiticas';

//Almacenamiento
import Almacenamiento from './dashboard/Almacenamiento';

export function Greet() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    invoke<string>('greet', { name: 'React.js' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])

  return <div>{greeting}</div>;
}


export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Inicio />} />
          <Route path='pacientes' element={<Pacientes />} >
            <Route index element={<ListaPacientes />} />
            <Route path='registrar-paciente' element={<RegistrarPaciente />} />
          </Route>
          <Route path='instrumentos' element={<Instrumentos />} />
          <Route path='plantillas' element={<Plantillas />} >
            <Route index element={<ListaPlantillas />} />
            <Route path='crear-plantilla' element={<CrearPlantilla />} />
            <Route path='cargar-plantilla' element={<CargarPlantilla />} />
          </Route>
          <Route path='analiticas' element={<Analiticas />} />
          <Route path='almacenamiento' element={<Almacenamiento />} />
        </Route>
      </Routes>
    </>
  )
}


