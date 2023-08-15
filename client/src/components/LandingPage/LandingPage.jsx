import { NavLink } from "react-router-dom"
import style from "./LandingPage.module.css"
import homeImg from "../../assets/home.png"
import back from "../../assets/back.jpg"

function LandingPage() {

    return (
        <div className={style.container}>
            <NavLink className={style['nav-home']} to={"/pokemons"}>
                <img className={style['img-home']} src={homeImg}/>
            </NavLink>
        </div>
    )
}
export default LandingPage