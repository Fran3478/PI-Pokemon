import Cards from "../Cards/Cards"
import Error from "../Error/Error"
import {useDispatch, useSelector} from 'react-redux'
import { clearError, getAll, setError } from '../../redux/actions/actions'
import { useState, useEffect } from "react"
import SearchBar from "../SearchBar/SerchBar"

function Home() {
    const [loading, setLoading] = useState(true)
    const [searchedPokemon, setSearchedPokemon] = useState(null)
    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state.pokemons)
    const error = useSelector((state) => state.error)
    function showAll(event) {
        event.preventDefault()
        setSearchedPokemon(null)
        dispatch(clearError())
    }
    useEffect(() => {
        dispatch(getAll())
        .then(() => {
            setLoading(false)
        })
    }, [dispatch])
    
    return(
        <div>
            <SearchBar onSearch={(pokemon) => setSearchedPokemon(pokemon)} />
            <p>Pokemons: </p>
            {loading ? <p>Loading...</p> : error ? <Error error={error}/> : searchedPokemon ? <Cards pokemons={[searchedPokemon]}/> : <Cards pokemons={pokemons}/>}
            {searchedPokemon ? <button onClick={showAll}>Show All Pokemons</button> : null}
        </div>
        
    )
}

export default Home