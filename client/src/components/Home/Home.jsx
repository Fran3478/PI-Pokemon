import Cards from "../Cards/Cards"
import Error from "../Error/Error"
import {useDispatch, useSelector} from 'react-redux'
import { getAll } from '../../redux/actions/actions'
import { useState, useEffect } from "react"

function Home() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state.pokemons)
    const error = useSelector((state) => state.error)
    useEffect(() => {
        dispatch(getAll())
        .then(() => {
            setLoading(false)
        })
    }, [dispatch])
    
    return(
        <div>
            <p>Pokemons: </p>
            {loading ? <p>Loading...</p> : error ? <Error error={error}/> : <Cards pokemons={pokemons}/>}
        </div>
        
    )
}

export default Home