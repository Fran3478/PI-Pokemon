import Cards from "../Cards/Cards"
import Error from "../Error/Error"
import {connect, useDispatch, useSelector} from 'react-redux'
import { clearError, getAll } from '../../redux/actions/actions'
import { useState, useEffect } from "react"
import SearchBar from "../SearchBar/SerchBar"

function Home({pokemons, error}) {
    const [loading, setLoading] = useState(true)
    const [searchedPokemon, setSearchedPokemon] = useState(null)
    const loadedPokemons = useSelector((state) => state.pokemons.length > 0)
    const dispatch = useDispatch()
    function showAll(event) {
        event.preventDefault()
        setSearchedPokemon(null)
        dispatch(clearError())
    }
    useEffect(() => {
        if(!loadedPokemons && !error) {
            dispatch(getAll())
            .then(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [dispatch, loadedPokemons, error])
    
    return(
        <div>
            <SearchBar onSearch={(pokemon) => setSearchedPokemon(pokemon)} />
            <p>Pokemons: </p>
            {loading ? 
                <p>Loading...</p> : 
                error ? 
                <Error error={error}/> : 
                searchedPokemon ? 
                <Cards pokemons={[searchedPokemon]}/> : 
                <Cards pokemons={pokemons}/>
            }
            {searchedPokemon ? 
                <button onClick={showAll}>Show All Pokemons</button> : 
                null
            }
        </div>
        
    )
}

export function mapStateToProps(state) {
    return {
        pokemons: state.pokemons,
        error: state.error
    }
}

export default connect(mapStateToProps)(Home)