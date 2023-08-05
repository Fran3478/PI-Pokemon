require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")

async function getAllFromApi() {
    try {
        const {data} = await axios(API_URL)
        const urlAllPokemons = data.next.slice(0, data.next.length -2) + data.count.toString()
        let resultApi = data.results
        const responseAll = await axios(urlAllPokemons)
        let promises = []
        resultApi.concat(responseAll.data.results).map((pokemon) => promises.push(axios(pokemon.url)))
        let pokemons = []
        await Promise.all(promises)
        .then((responses) => {
            pokemons = responses.map((pokemon) => {
                return {
                    id: pokemon.data.id,
                    name: pokemon.data.name,
                    image: pokemon.data.sprites.other.home.front_default || pokemon.data.sprites.front_default,
                    hp: pokemon.data.stats[0].base_stat,
                    attack: pokemon.data.stats[1].base_stat,
                    defense: pokemon.data.stats[2].base_stat,
                    speed: pokemon.data.stats[5].base_stat,
                    height: pokemon.data.height,
                    weight: pokemon.data.weight,
                    types: pokemon.data.types.map((type) => type.type.name)
                }
            })
        })
        .catch((err) => {
            return {err: {status: 500, msg: err.message}}
        })
        return pokemons
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getAllFromApi