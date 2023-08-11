import ('dotenv').config()
import {GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_BY_ID, GET_TYPES, RESET, FILTER_TYPE, FILTER_FROM, SORT_NAME, SORT_ATTACK } from './actionTypes'
import axios from 'axios'

const {API_POKEMONS, API_TYPES} = process.env

export const getAll = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios(API_POKEMONS)
            return dispatch({
                type:GET_POKEMONS,
                payload: data
            })
        } catch (error) {
            alert(error.msg)
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
            alert(error.msg)
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
            alert(error.msg)
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
            alert(error.msg)
        }
    }
}

export const filterByType = (types) => {
    return {
        type: FILTER_TYPE,
        payload: types
    }
}

export const filterByOrigin = (origin) => {
    return {
        type:FILTER_FROM,
        payload: origin
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
    return {type: RESET}
}