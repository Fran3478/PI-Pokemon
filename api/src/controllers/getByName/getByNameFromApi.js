require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")

async function getByNameFromApi(name) {
    try {
        const {data} = await axios(`${API_URL}/${name.toLowerCase()}`) // Se realiza la peticion a la api por el nombre recibido
        const pokemon = { // Se crea un objeto con las propiedades necesarias, obteniendo unicamente el name de los types
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
        return pokemon // Devuelve el objeto
    } catch (error) {
        if(error.response.status === 404) { // En caso recibir un status 404 (el pokemon no se encontro) se devuelve null al handler
            return null
        }
        if(error.code && error.code === "ECONNREFUSED"){ // Si no pudo conectar con la api crea un mensaje apropiado
            error.msg = "API Unreachable 😢 Try again later"
        }
        return {err: {status: 500, msg: error.msg || error.message}} // En caso de existir algun error se devuelve un objeto con informacion asociada
    }
}

module.exports = getByNameFromApi