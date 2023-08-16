import Cards from "../Cards/Cards"
import Error from "../Error/Error"
import Pagination from "../Pagination/Pagination"
import {connect, useDispatch, useSelector} from 'react-redux'
import { clearError, getAll, setCurrentPage } from '../../redux/actions/actions'
import { useState, useEffect } from "react"
import SearchBar from "../SearchBar/SerchBar"
import style from "./Home.module.css"
import Loading from "../Loading/Loading"

function Home({pokemons, error, currentPage}) {
    const [loading, setLoading] = useState(true)
    const [searchedPokemon, setSearchedPokemon] = useState(null)
    const loadedPokemons = useSelector((state) => state.pokemons.length > 0)
    const dispatch = useDispatch()
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const lastPokemon = currentPage * pokemonsPerPage
    const firstPokemon = lastPokemon - pokemonsPerPage
    const currentPokemons = pokemons.slice(firstPokemon, lastPokemon)

    function pagination(pageNumber) {
        dispatch(setCurrentPage(pageNumber))
    }
    function showAll(event) {
        event.preventDefault()
        setSearchedPokemon(null)
        dispatch(clearError())
        dispatch(setCurrentPage(1))
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
        <div className={style.container}>
            <div className={style['search-pagination-container']}>
                <SearchBar onSearch={(pokemon) => setSearchedPokemon(pokemon)} />
                <Pagination pokemonsPerPage={pokemonsPerPage} pokemonAmount={pokemons.length} pagination={pagination}/>
            </div>
            {loading ? 
                <Loading/> : 
                error ? 
                <Error error={error}/> : 
                searchedPokemon ? 
                    <Cards pokemons={[searchedPokemon]}/> : 
                    <Cards pokemons={currentPokemons}/>
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
        error: state.error,
        currentPage: state.currentPage
    }
}

export default connect(mapStateToProps)(Home)