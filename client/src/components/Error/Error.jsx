import errorImg from "../../assets/error.gif"
import style from "./Error.module.css"

function Error ({error}) {

    return (
        <div>
            <img src={errorImg}/>
            <p className={style.error}>{error}</p>
        </div>
    )
}

export default Error