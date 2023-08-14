import errorImg from "../../assets/error.gif"

function Error ({error}) {

    return (
        <div>
            <img src={errorImg}/>
            <p>{error}</p>
        </div>
    )
}

export default Error