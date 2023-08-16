import {NavLink, useLocation} from 'react-router-dom'
import logo from "../../assets/logo.png"
import style from './NavBar.module.css';

function NavBar () {
    const location = useLocation()
    
    return (
        <div className={style.container}>
            <div className={style['container-button']}>
                <NavLink to={"/"}>
                    <button className={style.button}>Start</button>
                </NavLink>
                <NavLink to={"/pokemons"}>
                    <button className={style.button}>Home</button>
                </NavLink>
                <NavLink to={"/create-pokemon"}>
                    <button className={style.button}>Create New Pokemon</button>
                </NavLink>
            </div>
            
            <img className={style.logo} src={logo}/>
            
            
        </div>
    )
}

export default NavBar