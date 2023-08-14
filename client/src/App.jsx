import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import LandingPage from './components/LandingPage/LandingPage'
import Detail from './components/Detail/Detail'

function App() {
  

  return (
    <div className="App">
      {/* <NavBar/> */}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path={'/pokemons'} element={<Home/>}/>
        <Route path={'/detail/:id'} element={<Detail/>}/>
      </Routes>
      
    </div>
  )
}

export default App