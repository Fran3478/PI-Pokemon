import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getById } from "../../redux/actions/actions";
import {typeImg} from '../../imgImport/typeImg'
import style from "./Detail.module.css"
import Loading from "../Loading/Loading";

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
        <div className={style["detail-back"]}>
            {
                loading ? <Loading/> :
                <div className={style["detail-container"]}>
                    <div className={style["image-container"]}>
                        {pokemon.image ? <img className={style['pokemon-image']} src={pokemon.image} alt={pokemon.name}/> : null}
                    </div>
                    <div className={style['info-container']}>
                        <h1>{pokemon.name}</h1>
                        <div>
                            <p>HP: {pokemon.hp}</p>
                            <p>Attack: {pokemon.attack}</p>
                            <p>Defense: {pokemon.defense}</p>
                            {pokemon.speed ? <p>Speed: {pokemon.speed}</p> : null}
                            {pokemon.height ? <p>Height: {pokemon.height}</p> : null}
                            {pokemon.weight ? <p>Weight: {pokemon.weight}</p> : null}
                            <p>Types:</p>
                            <div className={style['types-container']}>
                                <div>
                                    {pokemon.types.map(type => <img key={type} src={typeImg(type)}/>)}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                
            }
        </div>
    )
}

export default Detail