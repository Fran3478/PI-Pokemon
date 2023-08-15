import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";
import Filter from "../Filter/Filter";

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

    return (
        <div>
            <Filter/>
            <input type="search" placeholder="Pokemon's name..." onChange={handleChange} value={name}/>
            <button onClick={handleClick} >Search</button>
            {error ? <p>{error}</p> : null}
        </div>
    )
}

export default SearchBar