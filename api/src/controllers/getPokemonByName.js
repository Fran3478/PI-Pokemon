const getByNameFromApi = require("./getByName/getByNameFromApi")
const getByNameFromDb = require("./getByName/getByNameFromDb")

async function getPokemonByName(req, res) {
    const {name} = req.params
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
}

module.exports = getPokemonByName