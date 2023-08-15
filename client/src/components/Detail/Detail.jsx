import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getById } from "../../redux/actions/actions";
import {typeImg} from '../../imgImport/typeImg'

function Detail() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemon)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(getById(id))
        .then(() => {
            setLoading(false)
        })
    }, [dispatch])

    return (
        <div>
            {
                loading ? <p>Loading...</p> :
                <div>
                    <div>
                        {pokemon.image ? <img src={pokemon.image} alt={pokemon.name}/> : null}
                    </div>
                    <div>
                        <h1>{pokemon.name}</h1>
                        <div>
                            <p>HP: {pokemon.hp}</p>
                            <p>Attack: {pokemon.attack}</p>
                            <p>Defense: {pokemon.defense}</p>
                            {pokemon.speed ? <p>Speed: {pokemon.speed}</p> : null}
                            {pokemon.height ? <p>Height: {pokemon.height}</p> : null}
                            {pokemon.weight ? <p>Weight: {pokemon.weight}</p> : null}
                            <div>
                                <p>Types:</p>
                                {pokemon.types.map(type => <img key={type} src={typeImg(type)}/>)}
                            </div>
                        </div>
                    </div>
                </div>
                
            }
        </div>
    )
}

export default Detail