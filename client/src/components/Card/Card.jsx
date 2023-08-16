import {Link} from 'react-router-dom'
import defaultImg from '../../assets/no-image.png'
import {typeImg} from '../../imgImport/typeImg'
import style from './Card.module.css'


function Card(props) {

    return(
        <div className={style.container}>
            <Link to={`/detail/${props.id}`}>
                <div>
                    <p className={style.name}>{props.name}</p>
                    <img  className={style.pokemonImg} src={props.image ? props.image : defaultImg}/>
                </div>
                <div className={style['type-container']} >
                    {props.types.map(type => (
                        <div key={`div-${props.id}-${type}`}>
                            <img className={style.type} key={`${props.id}-${type}`} src={typeImg(type)} alt={type}/>
                        </div>
                    ))}
                </div>
            </Link>
            
        </div>
    )
}

export default Card