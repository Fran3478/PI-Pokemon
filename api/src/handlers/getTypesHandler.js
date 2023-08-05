const getTypesFromDb = require("../controllers/getTypes/getTypesFromDb")
const getTypesFromApi = require("../controllers/getTypes/getTypesFromApi")

async function getTypesHandler(req, res) {
    try {
        const types = await getTypesFromDb()
        if(types.length === 0) {
            const apiTypes = await getTypesFromApi()
            if(apiTypes.err) {
                return res.status(apiTypes.err.status).json(apiTypes.err.msg)
            }
            return res.json(apiTypes)
        }
        return res.json(types)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = getTypesHandler