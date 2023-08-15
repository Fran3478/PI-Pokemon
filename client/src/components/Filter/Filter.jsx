import { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getTypes, filterPokemon } from "../../redux/actions/actions";

function Filter ({filter}) {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    
    function handleType(event) {
        const {value} = event.target
        dispatch(filterPokemon({...filter, type: value}))
    }

    function handleOrigin(event) {
        const {value} = event.target
        dispatch(filterPokemon({...filter, origin: value}))
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return (
        <div>
            <p>Filter By:</p>
            <label>Type</label>
            <div>
                <select onChange={handleType}>
                    <option value={''} >All Types</option>
                    {types.map(type => (
                        <option key={type.id} value={type.name} >{type.name}</option>
                    ))}
                </select>
            </div>
            <label>Origin</label>
            <div>
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