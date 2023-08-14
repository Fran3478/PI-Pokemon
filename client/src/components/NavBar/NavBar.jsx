import {NavLink, useLocation} from 'react-router-dom'

function NavBar () {
    const location = useLocation()
    
    return (
        <div>
            <NavLink to={"/"}>
                <button>Start</button>
            </NavLink>
            {location.pathname !== '/pokemons' ?
                <NavLink to={"/pokemons"}>
                    <button>Home</button>
                </NavLink> : null
            }
            {location.pathname !== '/create-pokemon' ?
                <NavLink to={"/create-pokemon"}>
                    <button>Create New Pokemon</button>
                </NavLink> : null
            }
            
            
            
        </div>
    )
}

export default NavBar