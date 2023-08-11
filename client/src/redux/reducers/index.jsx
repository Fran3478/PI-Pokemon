import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, RESET, FILTER_TYPE, FILTER_FROM, SORT_NAME, SORT_ATTACK } from "../actions/actionTypes";

const initialGlobalState = {
    allPokemons: [],
    pokemons: [],
    sortedPokemons: [],
    filtered: false,
    pokemon: {},
}

function rootReducer(state = initialGlobalState, action) {

    switch (action.type) {
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons: action.payload}
        case GET_POKEMON_BY_ID:
            return {...state, pokemon: action.payload}
        case GET_POKEMON_BY_NAME:
            return {...state, pokemon: action.payload}
        case GET_TYPES:
            return {...state, types: action.payload}
        case FILTER_TYPE:
            const filteredByType = state.sortedPokemons.filter((pokemon) => pokemon.types.includes(action.payload))
            return {...state, pokemons: filteredByType, filtered: true}
        case FILTER_FROM:
            const filteredByOrigin = state.sortedPokemons.filter((pokemon) => action.payload === 'DB' ? !Number(pokemon.id) : Number(pokemon.id))
            return {...state, pokemons: filteredByOrigin, filtered: true}
        case SORT_NAME:
            function sortPokemon(pokemons) {
                return pokemons.slice().sort((a, b) => {
                    if(action.payload === 'ASC'){
                        if(a.name > b.name) return 1
                        if(a.name < b.name) return -1
                        return 0
                    } else {
                        if(a.name > b.name) return -1
                        if(a.name < b.name) return 1
                        return 0
                    }
                })
            }
            const sortedByName = sortPokemon(state.sortedPokemons)
            if(state.filtered){
                const sortedByNameFiltered = sortPokemon(state.pokemons)
                return {...state, pokemons: sortedByNameFiltered, sortPokemon: sortedByName}
            } else {
                return {...state, pokemons: sortedByName, sortPokemon: sortedByName}
            }
        case SORT_ATTACK:
            function sortPokemon(pokemons) {
                return pokemons.slice().sort((a, b) => {
                    if(action.payload === 'ASC') return (a - b)
                    return (b - a)
                })
            }
            const sortedByAttack = sortPokemon(state.sortedPokemons)
            if(state.filtered){
                const sortedByAttackFiltered = sortPokemon(state.pokemons)
                return {...state, pokemons: sortedByAttackFiltered, sortPokemon: sortedByAttack}
            } else {
                return {...state, pokemons: sortedByAttack, sortPokemon: sortedByAttack}
            }
        case RESET:
            return {...state, pokemons: allPokemons, sortPokemon: allPokemons, filtered: false}
        default:
            return {...state}
    }
}

export default rootReducer