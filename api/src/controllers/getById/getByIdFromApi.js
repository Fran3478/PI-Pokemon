require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")

async function getByIdFromApi(idPokemon) {
    try {
        const {data} = await axios(`${API_URL}/${idPokemon}`) // Se realiza una peticion a la api por el id recibido
        const pokemon = { // Se crea el objeto a devolver con las propiedades requeridas y se obtiene un arreglo con los names de los types que tenga ese pokemon
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
        return pokemon // Devuelve el objeto creado
    } catch (error) {
        if(error.response.status === 404) { // En caso de recibir un error con status 404 se devuelve el mensaje correspondiente
            return {err: {status: 404, msg: "Pokemon Id Not Found"}}
        }
        if(error.code && error.code === "ECONNREFUSED"){ // En caso de que no se pueda realizar la coneccion con la api se crea un mensaje personalizado
            error.msg = "API Unreachable 😢 Try again later"
        }
        return {err: {status: 500, msg: error.msg || error.message}} // Se devuelve un objeto de error en caso de existir
    }
}

module.exports = getByIdFromApi