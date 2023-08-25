require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")
const fs = require('fs')
const path = require('path')

async function getAllFromApi() {
    try {
        const {data} = await axios(API_URL) // Se realiza una primera consulta y se obtiene un obj con los primeros 20 pokemons, la cantidad total y el link a los siguientes
        const urlAllPokemons = data.next.slice(0, data.next.length -2) + data.count.toString() // Se modifica el link seteando como limite el nro total de pokemons
        let resultApi = data.results // Se guardan los pokemons de la primera consulta
        const responseAll = await axios(urlAllPokemons) // Se realiza una segunda peticion con el link modificado
        let promises = []
        resultApi.concat(responseAll.data.results).map((pokemon) => promises.push(axios(pokemon.url))) // Se concatenan dentro de un array las peticiones a cada url de cada pokemon en forma de promesas, para obtener los atributos de c/u
       
        // const rawData = fs.readFileSync(path.join(__dirname, '../../apiInfo.json'), 'utf8');
        // const dataArray = JSON.parse(rawData);
        // const pokemons = dataArray
        let pokemons = []
        await Promise.all(promises) // Se resuelven las promesas
        .then((responses) => {
            pokemons = responses.map((pokemon) => { // Se crea un array de objetos de todos los pokemons con sus respectivos atributos
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
                    types: pokemon.data.types.map((type) => type.type.name) // Se obtienen los nombres de los types dentro de un array
                }
            })
        })
        .catch((err) => {
            throw err // En caso de que ocurra un error se arroja el error para que el lo capte el catch (try catch)
        })
        return pokemons // Se retorna el array de pokemons
    } catch (error) {
        if(error.code && error.code === "ECONNREFUSED"){ // En caso que no se logre conectar con la api se crea un mensaje de error personalizado
            error.msg = "API Unreachable 😢 Try again later"
        }
        if(error.code && error.code === "ETIMEDOUT"){ // En caso que no se logre conectar con la api se crea un mensaje de error personalizado
            error.msg = "API Refuses to give us the info 😢 Try again later"
        }
        return {err: {status: 500, msg: error.msg || error.message}} // Se devuelve un objeto de error si ocurre
    }
}

module.exports = getAllFromApi