const {Type} = require("../../db")

async function getTypesFromDb() {
    try {
        const types = await Type.findAll() // Realiza una consulta global a la tabla type de db
        return types // Retorna el array de objetos devuelto por la consulta
    } catch (err) {
        return {err: {status: 500, msg: err.message}} // De existir un error devuelve un objeto de error
    }
}

module.exports = getTypesFromDb