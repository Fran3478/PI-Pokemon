require("dotenv").config()
const {API_URL_TYPES} = process.env
const axios = require("axios")
const {Type} = require("../../db")
const getTypesFromDb = require("./getTypesFromDb")

async function getTypesFromApi() {
    try {
        const {data} = await axios(`${API_URL_TYPES}`)
        const types = data.results.map((type) => {
            return {name: type.name}
        })
        await Type.bulkCreate(types)
        const dbTypes = await getTypesFromDb()
        return dbTypes
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getTypesFromApi