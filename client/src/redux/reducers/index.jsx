import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, RESET, FILTER, SORT_NAME, SORT_ATTACK, SET_ERROR, CLEAR_ERROR } from "../actions/actionTypes";

const initialState = {
    allPokemons: [],
    pokemons: [],
    types: [],
    sortedPokemons: [],
    filtered: false,
    filter: {
        type: '',
        origin: ''
    },
    order: {
        name: '',
        attack: ''
    },
    pokemon: {},
    successfullyCreated: null,
    error: null
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_POKEMONS:
            return {...state, allPokemons: action.payload, pokemons: action.payload, sortedPokemons: action.payload}
        case GET_POKEMON_BY_ID:
            return {...state, pokemon: action.payload}
        case GET_POKEMON_BY_NAME:
            return {...state, pokemon: action.payload}
        case GET_TYPES:
            return {...state, types: action.payload}
        case POST_POKEMON:
            return {...state, successfullyCreated: action.payload}
        case FILTER:
            const {type, origin} = action.payload
            let filteredPokemons = []
            if(type && origin) {
                filteredPokemons = state.sortedPokemons.filter((pokemon) => pokemon.types.includes(type)).filter((pokemon) => origin === 'DB' ? !Number(pokemon.id) : Number(pokemon.id))
            } else if(type) {
                filteredPokemons = state.sortedPokemons.filter((pokemon) => pokemon.types.includes(type))
            } else if(origin) {
                filteredPokemons = state.sortedPokemons.filter((pokemon) => origin === 'DB' ? !Number(pokemon.id) : Number(pokemon.id))
            } else {
                filteredPokemons = state.sortedPokemons
            }
            return {...state, pokemons: filteredPokemons, filter: {type, origin}, filtered: true}
        case SORT_NAME:
            function sortByName(pokemons) {
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
            const sortedByName = sortByName(state.sortedPokemons)
            if(state.filtered){
                const sortedByNameFiltered = sortByName(state.pokemons)
                return {...state, pokemons: sortedByNameFiltered, sortPokemon: sortedByName}
            } else {
                return {...state, pokemons: sortedByName, sortPokemon: sortedByName}
            }
        case SORT_ATTACK:
            function sortByAttack(pokemons) {
                return pokemons.slice().sort((a, b) => {
                    if(action.payload === 'ASC') return (a - b)
                    return (b - a)
                })
            }
            const sortedByAttack = sortByAttack(state.sortedPokemons)
            if(state.filtered){
                const sortedByAttackFiltered = sortByAttack(state.pokemons)
                return {...state, pokemons: sortedByAttackFiltered, sortPokemon: sortedByAttack}
            } else {
                return {...state, pokemons: sortedByAttack, sortPokemon: sortedByAttack}
            }
        case SET_ERROR:
            return {...state, error: action.payload}
        case CLEAR_ERROR:
            return {...state, error: null}
        case RESET:
            return {...state, pokemons: allPokemons, sortPokemon: allPokemons, filtered: false}
        default:
            return {...state}
    }
}

export default rootReducer