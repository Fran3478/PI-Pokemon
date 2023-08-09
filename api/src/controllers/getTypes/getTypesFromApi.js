require("dotenv").config()
const {API_URL_TYPES} = process.env
const axios = require("axios")
const {Type} = require("../../db")
const getTypesFromDb = require("./getTypesFromDb")

async function getTypesFromApi() {
    try {
        const {data} = await axios(`${API_URL_TYPES}`) // Se realiza la peticion a la api y se obtiene la respuesta mediante destructuring
        const types = data.results.map((type) => { // Se obtiene un array de objetos con los nombres de los types
            return {name: type.name}
        })
        await Type.bulkCreate(types) // Se guardan los types en la db
        const dbTypes = await getTypesFromDb() // Se realiza la consulta a la db para obtener los types que se crearon
        return dbTypes // Devuelve el array de objetos types
    } catch (error) {
        if(error.code && error.code === "ECONNREFUSED"){ // En caso de no poder conectar con la api crea un mensaje personalizado
            error.msg = "API Unreachable 😢 Try again later"
        }
        return {err: {status: 500, msg: error.msg || error.message}} // De existir un error devuelve un objeto error
    }
}

module.exports = getTypesFromApi