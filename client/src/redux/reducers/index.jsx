import { GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, RESET, FILTER, SORT_NAME, SORT_ATTACK, SET_CURRENT_PAGE, SET_ERROR, CLEAR_ERROR, CLEAR_SUCCES } from "../actions/actionTypes";

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
    currentPage: 1,
    pokemon: {},
    successfullyCreated: null,
    error: ''
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
            if(filteredPokemons.length) {
                return {...state, pokemons: filteredPokemons, filter: {type, origin}, filtered: true}
            }
            return {...state, pokemons: state.sortedPokemons, filter: {type, origin}, filtered: false, error: "Ups, No Matches"}
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
            let sortedByNameFiltered
            if(state.filtered){
                sortedByNameFiltered = sortByName(state.pokemons)
            } else {
                sortedByNameFiltered = sortedByName
            }
            return {...state, pokemons: sortedByNameFiltered, sortedPokemons: sortedByName, order: {name: action.payload, attack: ''}}
        case SORT_ATTACK:
            function sortByAttack(pokemons) {
                return pokemons.slice().sort((a, b) => {
                    if(action.payload === 'ASC') {
                        return (a.attack - b.attack)
                    }
                    return (b.attack - a.attack)
                })
            }
            const sortedByAttack = sortByAttack(state.sortedPokemons)
            let sortedByAttackFiltered
            if(state.filtered){
                sortedByAttackFiltered = sortByAttack(state.pokemons)
            } else {
                sortedByAttackFiltered = sortedByAttack
            }
            return {...state, pokemons: sortedByAttackFiltered, sortedPokemons: sortedByAttack, order: {name: '', attack: action.payload}}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case SET_ERROR:
            return {...state, error: action.payload}
        case CLEAR_ERROR:
            return {...state, error: ''}
        case CLEAR_SUCCES:
            return {...state, successfullyCreated: null}
        case RESET:
            return {
                ...state, 
                pokemons: state.allPokemons, 
                sortedPokemons: state.allPokemons, 
                filtered: false, 
                filter: {
                    type: '',
                    origin: ''
                },
                order: {
                    name: '',
                    attack: ''
                },
                currentPage: 1
            }
        default:
            return {...state}
    }
}

export default rootReducer