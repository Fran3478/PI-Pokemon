//require ('dotenv').config()
import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID, GET_TYPES, POST_POKEMON, RESET, FILTER, SORT_NAME, SORT_ATTACK, SET_ERROR, CLEAR_ERROR } from './actionTypes'
import axios from 'axios'

// const {API_POKEMONS, API_TYPES} = process.env
const API_POKEMONS = "http://localhost:3001/pokemons/"
const API_TYPES = "http://localhost:3001/types"

export const getAll = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(API_POKEMONS)
            return dispatch({
                type: GET_POKEMONS,
                payload: data
            })
            
        } catch (error) {
            return dispatch(setError(error))
        }
    }
}

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            const {data} = await axios(API_POKEMONS, {
                params: {
                    name: name
                }
            })
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: data
            })
        } catch (error) {
            return dispatch(setError(error))
        }
    }
}

export const getById = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axios(API_POKEMONS + id)
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: data
            })
        } catch (error) {
            return dispatch(setError(error))
        }
    }
}

export const getTypes = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(API_TYPES)
            return dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (error) {
            return dispatch(setError(error))
        }
    }
}

export const createPokemon = (pokemon) => {
    return async (dispatch) => {
        try {
            const {data} = await axios.post(API_POKEMONS, pokemon)
            return dispatch({
                type: POST_POKEMON,
                payload: data
            })
        } catch (error) {
            return dispatch(setError(error))
        }
    }
}

export const filterPokemon = ({type, origin}) => {
    return {
        type: FILTER,
        payload: {type, origin}
    }
}

export const sortByName = (order) => {
    return {
        type: SORT_NAME,
        payload: order
    }
}

export const sortByAttack = (order) => {
    return {
        type: SORT_ATTACK,
        payload: order
    }
}

export const reset = () => {
    console.log('reset')
    return {type: RESET}
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error.response.data.msg || error.response.data || 'Something happend! 😧'
    }
}

export const clearError = () => {
    return {type: CLEAR_ERROR}
}