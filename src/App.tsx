import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import Login from './ui/Login';
import Dashboard from './dashboard/Dashboard';
import Pacientes from './dashboard/Pacientes';
import Analiticas from './dashboard/Analiticas';
import Instrumentos from './dashboard/Instrumentos';
import Plantillas from './dashboard/Plantillas';
import Inicio from './dashboard/Inicio';
import RegistrarPaciente from './dashboard/Pacientes/RegistrarPaciente';
import ListaPlantillas from './dashboard/Plantillas/ListaPlantillas';
import CargarPlantilla from './dashboard/Plantillas/CargarPlantilla';
import CrearPlantilla from './dashboard/Plantillas/CrearPlantilla';

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
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Inicio />} />
          <Route path='analiticas' element={<Analiticas />} />
          <Route path='pacientes' element={<Pacientes />} >
            <Route path='registrar-paciente' element={<RegistrarPaciente />}/>
          </Route>
          <Route path='instrumentos' element={<Instrumentos />} />
          <Route path='plantillas' element={<Plantillas />} >
            <Route index element={<ListaPlantillas />} />
            <Route path='crear-plantilla' element={<CrearPlantilla />} />
            <Route path='cargar-plantilla' element={<CargarPlantilla />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}


