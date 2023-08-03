const {Router} = require("express")
const getTypes = require("../controllers/getTypes")
const {Types} = require("../db")

const router = Router()

router.get("/types", getTypes)

module.exports = router