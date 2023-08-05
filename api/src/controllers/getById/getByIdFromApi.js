require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")

async function getByIdFromApi(idPokemon) {
    try {
        const {data} = await axios(`${API_URL}/${idPokemon}`)
        const pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.other.home.front_default || data.sprites.front_default,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type) => type.type.name)
        }
        return pokemon
    } catch (error) {
        if(error.response.status === 404) {
            return {err: {status: 404, msg: "Pokemon Id Not Found"}}
        }
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getByIdFromApi