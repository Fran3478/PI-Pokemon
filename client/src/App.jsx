import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== '/' ? <NavBar/> : null}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path={'/pokemons'} element={<Home/>}/>
        <Route path={'/detail/:id'} element={<Detail/>}/>
        <Route path={'/create-pokemon'} element={<Form/>}/>
      </Routes>
      
    </div>
  )
}

export default App