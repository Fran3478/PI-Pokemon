import {Link} from 'react-router-dom'
import defaultImg from '../../assets/no-image.png'
import {typeImg} from '../../imgImport/typeImg'


function Card(props) {

    return(
        <div>
            <Link to={`/detail/${props.id}`}>
                <div>
                    <p>{props.name}</p>
                    <img src={props.image ? props.image : defaultImg}/>
                </div>
                <div>
                    {props.types.map(type => (
                        <div key={`div-${props.id}-${type}`}>
                            <img key={`${props.id}-${type}`} src={typeImg(type)} alt={type}/>
                        </div>
                    ))}
                </div>
            </Link>
            
        </div>
    )
}

export default Card