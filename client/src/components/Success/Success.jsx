import successImg from "../../assets/success.gif"
import style from "./Success.module.css"

function Success ({success}) {

    return (
        <div className={style.container}>
            <img src={successImg}/>
            <p>{success}</p>
        </div>
    )
}

export default Success