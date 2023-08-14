import { NavLink } from "react-router-dom"
import Error from "../Error/Error"
import Success from "../Success/Success"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, createPokemon  } from "../../redux/actions/actions"
import {validators, validateAll} from "../../validators/validators"

function Form () {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const error = useSelector((state) => state.error)
    const successfullyCreated = useSelector((state) => state.successfullyCreated)
    const [loading, setLoading] = useState(true)
    const [errorInput, setErrorInput] = useState({})
    const [errorSubmit, setErrorSubmit] = useState(false)
    const [createdPokemon, setCreactedPokemon] = useState({
        name: '',
        image:'',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        weight: 0,
        height: 0,
        types: []
    })
    function handleChanges(event) {
        event.preventDefault()
        const {name, value} = event.target
        setCreactedPokemon({...createdPokemon, [name]: value})
        setErrorInput({...errorInput, [name]: validators(value, name)})
        console.log(errorInput)
    }
    function handleType(event) {
        event.preventDefault()
        const {name} = event.target
        if(!createdPokemon.types.includes(name)) {
            setCreactedPokemon({...createdPokemon, types: [...createdPokemon.types, name]})
            setErrorInput({...errorInput, types: validators([createdPokemon.types, name], "types")})
        } else {
            setCreactedPokemon({...createdPokemon, types: createdPokemon.types.filter((type) => type !== name)})
            setErrorInput({...errorInput, types: validators(createdPokemon.types.filter((type) => type !== name), "types")})
        }
        console.log(errorInput)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const err = validateAll(createdPokemon)
        if(Object.keys(err).length) {
            setErrorInput(err)
            setErrorSubmit(true)
        } else {
            dispatch(createPokemon(createdPokemon))
        }
    }

    useEffect(() => {
        dispatch(getTypes())
        .then(setLoading(false))
    }, [dispatch])

    return (
        <div>
            <form>
                <label>Name: </label>
                <input type="text" name="name" value={createdPokemon.name} onChange={handleChanges}/>
                {errorInput.name ? <span>{errorInput.name}</span> : null}
                <label>Image: </label>
                <input type="text" name="image" value={createdPokemon.image} onChange={handleChanges}/>
                {errorInput.image ? <span>{errorInput.image}</span> : null}
                <label>Hit Points: </label>
                <input type="number" name="hp" value={createdPokemon.hp} onChange={handleChanges}/>
                {errorInput.hp ? <span>{errorInput.hp}</span> : null}
                <label>Attack: </label>
                <input type="number" name="attack" value={createdPokemon.attack} onChange={handleChanges}/>
                {errorInput.attack ? <span>{errorInput.attack}</span> : null}
                <label>Defense: </label>
                <input type="number" name="defense" value={createdPokemon.defense} onChange={handleChanges}/>
                {errorInput.defense ? <span>{errorInput.defense}</span> : null}
                <label>Speed: </label>
                <input type="number" name="speed" value={createdPokemon.speed} onChange={handleChanges}/>
                {errorInput.speed ? <span>{errorInput.speed}</span> : null}
                <label>Weight: </label>
                <input type="number" name="weight" value={createdPokemon.weight} onChange={handleChanges}/>
                {errorInput.weight ? <span>{errorInput.weight}</span> : null}
                <label>Height: </label>
                <input type="number" name="height" value={createdPokemon.height} onChange={handleChanges}/>
                {errorInput.height ? <span>{errorInput.height}</span> : null}
                <label>Types: </label>
                {errorInput.types ? <span>{errorInput.types}</span> : null}
                {loading ? <p>Loading...</p> : types.map(type => <button key={type.id} name={type.name} onClick={handleType}>{type.name}</button>)}
                <button onClick={handleSubmit}>Create Pokemon</button>
            </form>
            {
                error ? 
                    <Error error={error}/> : 
                    successfullyCreated ?
                        <div>
                            <Success success={successfullyCreated.msg}/>
                            <NavLink to={"/pokemons"}>
                                <button>Ok!</button>
                            </NavLink>
                        </div> : null
            }
        </div>
    )
}

export default Form