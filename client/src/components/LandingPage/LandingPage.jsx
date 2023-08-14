import { NavLink } from "react-router-dom"

function LandingPage() {

    return (
        <div>
            <NavLink to={"/pokemons"}>
                <button>Home</button>
            </NavLink>
        </div>
    )
}

export default LandingPage