import notFoundImg from "../../assets/notfound.gif"

function NotFound() {

    return (
        <div>
            <img src={notFoundImg}/>
            <p>Ups, No Matches</p>
        </div>
    )
}

export default NotFound