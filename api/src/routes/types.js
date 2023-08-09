const {Router} = require("express")
//Se importa el handler para types
const getTypesHandler = require("../handlers/getTypesHandler")

const router = Router()

// Se configura la ruta para types
router.get("/", getTypesHandler)

module.exports = router