import Nav from './ui/Nav'
import { Route, Routes } from 'react-router-dom';
import Home from './dashboard/Home';

// pasarle componentes

const Search = () => <h1>Search page</h1>;

export default function App() {
  return (
    <main>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </main>
  )
}


