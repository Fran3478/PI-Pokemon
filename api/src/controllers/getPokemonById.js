const getByIdFromApi = require("./getById/getByIdFromApi")
const getByIdFromDb = require("./getById/getByIdFromDb")

async function getPokemonById (req, res) {
    const {idPokemon} = req.params
    let response
    if(Number(idPokemon)) {
        response = await getByIdFromApi(idPokemon)
    } else {
        response = await getByIdFromDb(idPokemon)
    }
    if(response.err) {
        return res.status(response.err.status).json({msg: response.err.msg})
    }
    return res.json(response)
}

module.exports = getPokemonById