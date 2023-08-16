import { NavLink } from "react-router-dom"
import Error from "../Error/Error"
import Success from "../Success/Success"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes, createPokemon, clearError  } from "../../redux/actions/actions"
import {validators, validateAll} from "../../validators/validators"
import style from "./Form.module.css"
import Loading from "../Loading/Loading"

function Form () {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const loadedTypes = useSelector((state) => state.types.length > 0)
    const error = useSelector((state) => state.error)
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)
    const [errorInput, setErrorInput] = useState({})
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
        const {name, value} = event.target
        setCreactedPokemon({...createdPokemon, [name]: value})
        setErrorInput({...errorInput, [name]: validators(value, name)})
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
    }

    function handleSubmit(event) {
        event.preventDefault()
        const err = validateAll(createdPokemon)
        dispatch(clearError())
        if(Object.keys(err).length) {
            setErrorInput(err)
        } else {
            dispatch(createPokemon(createdPokemon))
            .then((response) => {
                if(response.payload){
                    setSuccess(response.payload.msg)
                }
            })
        }
    }

    useEffect(() => {
        if(!loadedTypes) {
            dispatch(getTypes())
            .then(setLoading(false))
        } else {
            setLoading(false)
        }
        
    }, [dispatch, loadedTypes])

    return (
        <div className={style["form-container"]}>
            <form>
                <div className={`${style["form-container"]} ${style["form-input-column"]}`}>
                    <label>Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={createdPokemon.name} 
                        placeholder="Pokemon's Name..."  
                        onChange={handleChanges}
                    />
                    <label>Image: </label>
                    <input 
                        type="text" 
                        name="image" 
                        value={createdPokemon.image} 
                        placeholder="Image Url..." 
                        onChange={handleChanges}
                    />
                    <label>Hit Points: </label>
                    <input
                        type="number" 
                        name="hp" 
                        value={createdPokemon.hp} 
                        onChange={handleChanges}
                    />
                    <label>Attack: </label>
                    <input 
                        type="number" 
                        name="attack" 
                        value={createdPokemon.attack}
                        onChange={handleChanges}
                    />
                    <label>Defense: </label>
                    <input 
                        type="number" 
                        name="defense" 
                        value={createdPokemon.defense} 
                        onChange={handleChanges}
                    />
                    <label>Speed: </label>
                    <input 
                        type="number" 
                        name="speed" 
                        value={createdPokemon.speed} 
                        onChange={handleChanges}
                    />
                    <label>Weight: </label>
                    <input 
                        type="number" 
                        name="weight" 
                        value={createdPokemon.weight} 
                        onChange={handleChanges}
                    />
                    <label>Height: </label>
                    <input 
                        type="number" 
                        name="height" 
                        value={createdPokemon.height}
                        onChange={handleChanges}
                    />
                </div>

                <div className={style['error-container']}>
                    {errorInput.name ? 
                        <p className={style["error"]}>{errorInput.name}</p> : 
                    null}
                    {errorInput.image ? 
                        <p className={style["error"]}>{errorInput.image}</p> : 
                    null}
                    {errorInput.hp ? 
                        <p className={style["error"]}>{errorInput.hp}</p> :
                    null}
                    {errorInput.attack ? 
                        <p className={style["error"]}>{errorInput.attack}</p> : 
                    null}
                    {errorInput.defense ? 
                        <p className={style["error"]}>{errorInput.defense}</p> : 
                    null}
                    {errorInput.speed ? 
                        <p className={style["error"]}>{errorInput.speed}</p> : 
                    null}
                    {errorInput.weight ? 
                        <p className={style["error"]}>{errorInput.weight}</p> : 
                    null}
                    {errorInput.height ? 
                        <p className={style["error"]}>{errorInput.height}</p> : 
                    null}
                    {errorInput.types ? 
                        <p className={style["error"]}>{errorInput.types}</p> : 
                    null}
                </div>
                
                <label>Types: </label> {createdPokemon.types.map(type => (<span key={`span-${type}`} className={style['span-type']}>{type}</span>))}
                <div className={style["form-type-buttons"]}>
                    {loading ? <Loading/> : types.map(type => <button key={type.id} name={type.name} onClick={handleType}>{type.name}</button>)}
                    
                </div>
                <button type="submit" className={style["form-button"]} onClick={handleSubmit}>Create Pokemon</button>
            </form>
            {
                error ? 
                    <Error error={error}/> : 
                    success ?
                        <div className={style["form-success"]}>
                            <Success success={success}/>
                            <NavLink to={"/pokemons"}>
                                <button className={style["form-button"]}>Ok!</button>
                            </NavLink>
                        </div> : null
            }
        </div>
    )
}

export default Form
