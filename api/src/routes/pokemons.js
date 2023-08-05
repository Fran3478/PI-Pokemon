const {Router} = require("express")
const getPokemonByNameHandler = require("../handlers/getPkmnByNameOrAllPkmnsHandler")
const postPokemonHandler = require("../handlers/postPkmnHandler")
const getPokemonByIdHandler = require("../handlers/getPkmnByIdHandler")

const router = Router()

router.get("/:idPokemon", getPokemonByIdHandler)
router.get("/", getPokemonByNameHandler)
router.post("/", postPokemonHandler)

module.exports = router