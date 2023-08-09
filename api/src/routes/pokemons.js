const {Router} = require("express")
//Se importan todos los handlers de pokemons
const getPokemonByNameHandler = require("../handlers/getPkmnByNameOrAllPkmnsHandler")
const postPokemonHandler = require("../handlers/postPkmnHandler")
const getPokemonByIdHandler = require("../handlers/getPkmnByIdHandler")

const router = Router()
// Se configura las distintas rutas para pokemons
router.get("/:idPokemon", getPokemonByIdHandler)
router.get("/", getPokemonByNameHandler)
router.post("/", postPokemonHandler)

module.exports = router