import { useEffect} from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getTypes, filterPokemon, clearError, setCurrentPage } from "../../redux/actions/actions";
import style from "./Filter.module.css"

function Filter ({filter}) {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const loadedTypes = useSelector((state) => state.types.length > 0)
    
    function handleType(event) {
        const {value} = event.target
        dispatch(clearError())
        dispatch(filterPokemon({...filter, type: value}))
        dispatch(setCurrentPage(1))
    }

    function handleOrigin(event) {
        const {value} = event.target
        dispatch(clearError())
        dispatch(filterPokemon({...filter, origin: value}))
        dispatch(setCurrentPage(1))
    }

    useEffect(() => {
        if(!loadedTypes) {
            dispatch(getTypes())
        }
        
    }, [dispatch, loadedTypes])

    return (
        <div className={style.container}>
            <h3>Filter By:</h3>
            <label>Type</label>
            <div className={style['select-container']}>
                <select onChange={handleType}>
                    <option value={''} >All Types</option>
                    {types.map(type => (
                        <option key={type.id} value={type.name} >{type.name}</option>
                    ))}
                </select>
            </div>
            <label>Origin</label>
            <div className={style['select-container']}>
                <select onChange={handleOrigin}>
                    <option value={''} >All Pokemons</option>
                    <option value={'API'} >API Pokemons</option>
                    <option value={'DB'} >DB Pokemons</option>
                </select>
            </div>
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps)(Filter)