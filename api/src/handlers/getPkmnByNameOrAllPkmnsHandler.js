// Se importan todos los controladores que manejan las peticiones get por nombre y las peticiones globales
const getByNameFromApi = require("../controllers/getByName/getByNameFromApi")
const getByNameFromDb = require("../controllers/getByName/getByNameFromDb")
const getAllFromApi = require('../controllers/getAll/getAllFromApi')
const getAllFromDb = require("../controllers/getAll/getAllFromDb")

const err = {status: null, msg: null} // Se declara el objeto que se pasara al middleware errorHandle en caso de ocurrir un error

async function getPokemonByNameHandler(req, res, next) {
    try {
        if(req.query.name) { // Si se recibe un name por query implica que corresponde a una consulta por nombre
            const {name} = req.query
        const apiPokemon = await getByNameFromApi(name) // Se pasa por parametro el nombre al controlador encargado de obtenerlo desde la api
        if(!apiPokemon || apiPokemon.err) {
            dbPokemon = await getByNameFromDb(name) // Si el resultado es nulo se pasa el nombre al controlador encargado de consultar a la base de datos
            if(!dbPokemon) {
                if(apiPokemon && apiPokemon.err) {
                    err.status = apiPokemon.err.status
                    err.msg = apiPokemon.err.msg
                    throw err // En caso de que la busqueda en db arroje nulo y la busqueda por api arroje error, este se devuelve
                }
                err.status = 404
                err.msg = `Pokemon Name: ${name} Not Found`
                throw err //Si el resultado es nulo y la consulta a la apo no arroje error, el pokemon no existe y devuelve mensaje correspondiente
            }
            if(dbPokemon.err) {
                err.status = dbPokemon.err.status
                err.msg = dbPokemon.err.msg 
                throw err // En caso de que la consulta a la api devuelva nulo y la consulta a la db devuelva un error, se envia el mismo
            }
            return res.json(dbPokemon) // Se envia el objeto pokemon devuelto por la db
        }
        return res.json(apiPokemon) // Se envia el objeto pokemon devuelto por la api
        } else { // Si no se recibe un name implica una consulta global (totalidad de pokemons)
            const apiPokemons = await getAllFromApi()
            const dbPokemons = await getAllFromDb()
            if(apiPokemons.err || dbPokemons.err){ // En caso de que alguna de las consultas arroje error, se devuelve este mismo
                return res.status(apiPokemons.err ? apiPokemons.err.status : dbPokemons.err.status).json(apiPokemons.err ? apiPokemons.err.msg : dbPokemons.err.msg)
            }
            return res.json(apiPokemons.concat(dbPokemons)) // Se concatena el resultado devuelto de ambas consultas y se devuelve el resultado
        }
    } catch (err) {
        next(err) // De existir se pasa el error al middleware de manejo de errores
    }
}

module.exports = getPokemonByNameHandler