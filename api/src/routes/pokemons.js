const {Router} = require("express")
const getAllPokemons = require("../controllers/getAllPokemons")
const getPokemonByName = require("../controllers/getPokemonByName")
const postPokemon = require("../controllers/postPokemon")
const getPokemonById = require("../controllers/getPokemonById")

const router = Router()

router.get("/", getAllPokemons)
router.get("/:idPokemon", getPokemonById)
router.get("/name/:name", getPokemonByName)
router.post("/", postPokemon)

module.exports = router