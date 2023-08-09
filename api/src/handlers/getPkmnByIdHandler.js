//Se importan los controllers para manejar las peticiones get por id
const getByIdFromApi = require("../controllers/getById/getByIdFromApi")
const getByIdFromDb = require("../controllers/getById/getByIdFromDb")

const err = {status: null, msg: null}

async function getPokemonByIdHandler (req, res, next) {
    const {idPokemon} = req.params // Se obtiene el id por parametros
    try {
        let response
        if(Number(idPokemon)) { //Se verifica si el valor del id recibido corresponde a un numero o no
            response = await getByIdFromApi(idPokemon) // en caso de ser un numero se pasa el id por parametro al controlador que va a manejar la solicitud a la api
        } else {
            response = await getByIdFromDb(idPokemon) // en caso no serlo se pasa el id por parametro al controlador que va a manejar la solicitud a la base de datos
        }
        if(response.err) {
            err.status = response.err.status
            err.msg = response.err.msg
            throw err // en caso de existir un error responde con el status y mensaje de error devueltos por los controladores
        }
        return res.json(response) //Respuesta cuyo contenido es el objeto pokemon con id concordante
    } catch (err) {
        next(err) // De existir se pasa el error al middleware de errores
    }
    
}

module.exports = getPokemonByIdHandler