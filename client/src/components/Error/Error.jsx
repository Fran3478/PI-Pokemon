import errorImg from "../../assets/error.png"

function Error ({error}) {

    return (
        <div>
            <img src={errorImg}/>
            <p>{error}</p>
        </div>
    )
}

export default Error