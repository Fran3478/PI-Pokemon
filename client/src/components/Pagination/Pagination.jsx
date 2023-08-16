import { useSelector } from "react-redux"
import style from "./Pagination.module.css"


function Pagination({pokemonsPerPage, pokemonAmount, pagination}) {
    const currentPage = useSelector((state) => state.currentPage)
    const error = useSelector((state) => state.error)
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(pokemonAmount/pokemonsPerPage); i++){ 
        pageNumbers.push(i)
    }

    let maxPages = 5
    let startPage = 0
    let endPage = 0
    if(pageNumbers.length < maxPages){
        maxPages = pageNumbers.length
    }
    if(currentPage < 3) {
        startPage = 1
    } else {
        startPage = currentPage - Math.floor(maxPages/2)
    }
    if(currentPage > pageNumbers.length - 2){
        startPage = pageNumbers.length - 4
        endPage = pageNumbers.length
    } else {
        endPage = startPage + maxPages - 1
    }

    return (
        <div>
            <ul>
                {!error ? pageNumbers.slice(startPage - 1, endPage).map(number => (
                        <li key={number}>
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>
                    )) :
                    <li><p>1</p></li>
                }
            </ul>
        </div>
    )
}

export default Pagination