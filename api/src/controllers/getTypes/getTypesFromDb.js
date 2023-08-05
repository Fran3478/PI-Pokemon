const {Type} = require("../../db")

async function getTypesFromDb() {
    try {
        const types = await Type.findAll()
        return types
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getTypesFromDb