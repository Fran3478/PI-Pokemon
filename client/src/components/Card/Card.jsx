import {Link} from 'react-router-dom'

function Card(props) {

    return(
        <div>
            <Link to={`/detail/${props.id}`}>
                <div>
                    <p>{props.name}</p>
                    <img src={props.image}/>
                </div>
                <div>
                    <p>
                        Types: {props.types.map(type => <span key={props.id + type}>{type} </span>)}
                    </p>
                    <p>Weight: {props.weight}</p>
                    <p>Height: {props.height}</p>
                </div>
            </Link>
            
        </div>
    )
}

export default Card