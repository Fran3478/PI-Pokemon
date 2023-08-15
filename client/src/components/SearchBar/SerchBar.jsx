import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, reset } from "../../redux/actions/actions";
import Filter from "../Filter/Filter";
import Order from "../Order/order";

function SearchBar({onSearch}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    function handleChange(event) {
        setName(event.target.value)
    }
    function handleClick(event) {
        event.preventDefault()
        setError("")
        if(name) {
            dispatch(getByName(name))
            .then((pokemon) => {
                onSearch(pokemon.payload)
            })
            setName("")
        } else {
            setError("No name Provided")
        }
    }
    function handleReset(event) {
        event.preventDefault()
        dispatch(reset())
    }

    return (
        <div>
            <Order/>
            <Filter/>
            <button onClick={handleReset} >Reset</button>
            <input type="search" placeholder="Pokemon's name..." onChange={handleChange} value={name}/>
            <button onClick={handleClick} >Search</button>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export default SearchBar