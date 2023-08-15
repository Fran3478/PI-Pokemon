import { useDispatch, connect } from "react-redux"
import { sortByName, sortByAttack } from "../../redux/actions/actions"

function Order({order}) {
    const dispatch = useDispatch()
    
    function handleName(event) {
        event.preventDefault()
        const {value} = event.target
        dispatch(sortByName(value))
    }
    function handleAttack(event) {
        event.preventDefault()
        const {value} = event.target
        dispatch(sortByAttack(value))
    }

    return (
        <div>
            <p>Order by :</p>
            <div>
                <label>Name</label>
                <button value={'ASC'} onClick={handleName}>{"A|Z"}</button>
                <button value={'DES'} onClick={handleName}>{"Z|A"}</button>
            </div>
            <div>
                <label>Attack</label>
                <button value={'ASC'} onClick={handleAttack}>{"<|>"}</button>
                <button value={'DES'} onClick={handleAttack}>{">|<"}</button>
            </div>
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        order: state.order
    }
}

export default connect(mapStateToProps)(Order)