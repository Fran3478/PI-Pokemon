const {Router} = require("express")
const getTypesHandler = require("../handlers/getTypesHandler")

const router = Router()

router.get("/", getTypesHandler)

module.exports = router