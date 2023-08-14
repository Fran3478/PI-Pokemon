import successImg from "../../assets/success.gif"
import { NavLink } from "react-router-dom"

function Success ({success}) {

    return (
        <div>
            <img src={successImg}/>
            <p>{success}</p>
        </div>
    )
}

export default Success