const getByNameFromApi = require("../controllers/getByName/getByNameFromApi")
const getByNameFromDb = require("../controllers/getByName/getByNameFromDb")
const getAllFromApi = require('../controllers/getAll/getAllFromApi')
const getAllFromDb = require("../controllers/getAll/getAllFromDb")

async function getPokemonByNameHandler(req, res) {
    try {
        if(req.query.name) {
            const {name} = req.query
        let pokemon
        pokemon = await getByNameFromApi(name)
        if(!pokemon ) {
            pokemon = await getByNameFromDb(name)
            if(!pokemon) {
                return res.status(404).json({msg: `Pokemon Name: ${name} Not Found`})
            }
            if(pokemon.err) {
                return res.status(pokemon.err.status).json(pokemon.err.msg)
            }
            return res.json(pokemon)
        }
        return res.json(pokemon)
        } else {
            const apiPokemons = await getAllFromApi()
            const dbPokemons = await getAllFromDb()
            if(apiPokemons.err || dbPokemons.err){
                return res.status(apiPokemons.err ? apiPokemons.err.status : dbPokemons.err.status).json(apiPokemons.err ? apiPokemons.err.msg : dbPokemons.err.msg)
            }
            return res.json(apiPokemons.concat(dbPokemons))
        }
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = getPokemonByNameHandler