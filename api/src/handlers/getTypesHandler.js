const getTypesFromDb = require("../controllers/getTypes/getTypesFromDb")
const getTypesFromApi = require("../controllers/getTypes/getTypesFromApi")

const err = {status: null, msg: null} // Se define el objeto de error

async function getTypesHandler(req, res, next) {
    try {
        const types = await getTypesFromDb() // Consulta la db para obtener todos los types
        if(types.err){ // De existir error en la consulta asigna el status y mensaje recibido
            err.status = types.err.status
            err.msg = types.err.msg
            throw err
        }
        if(!types.length) {
            const apiTypes = await getTypesFromApi() // De recibir un array vacio realiza la carga a la db
            if(apiTypes.err) { // De existir error en el proceso de carga asigna el status y mensaje recibido
                err.status = apiTypes.err.status
                err.msg = apiTypes.err.msg
                throw err
            }
            return res.json(apiTypes) // Retorna el array recibido del proceso de carga en la db
        }
        return res.json(types) // Retorno del array recibido de la consulta a la db
    } catch (err) {
        next(err) // De existir error lo pasa al middleware de error para menejarlo
    }
}

module.exports = getTypesHandler