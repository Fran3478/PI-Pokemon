const {Pokemon, Type} = require("../db")
const getByNameFromApi = require("../controllers/getByName/getByNameFromApi")
const getByNameFromDb = require("../controllers/getByName/getByNameFromDb")
const getTypesFromApi = require("../controllers/getTypes/getTypesFromApi")

async function postPokemonHandler(req, res) {
    const {name, image, hp, attack, defense, speed, height, weight, types} = req.body
    try {
        if(!name || !image || !hp || !attack || !defense || !types.length) {
            return res.status(401).json({msg: "Missing Mandatory Data"})
        }
        if(!Number(hp) || !Number(attack) || !Number(defense) || !Number(speed) || !Number(height) || !Number(weight)) {
            return res.status(401).json({msg: "Stats must be an Integer"})
        }
        const promises = [await getByNameFromApi(name), await getByNameFromDb(name)]
        Promise.all(promises)
        .then(async (response) => {
            if(!response[0] && !response[1]) {
                try {
                    const pokemon = await Pokemon.create({
                        name: name.toLowerCase(),
                        image,
                        hp: Number(hp),
                        attack: Number(attack),
                        defense: Number(defense),
                        speed: Number(speed),
                        height: Number(height),
                        weight: Number(weight)
                    })
                    const dbLoad = await Type.findOne({where:{name:types[0]}})
                    if(!dbLoad) {
                        await getTypesFromApi()
                    }
                    const promises = types.map(async (type) => {
                        return await Type.findOne({where:{name: type}})
                    })
                    Promise.all(promises)
                    .then(async (response) => await pokemon.addType(response))
                    .catch((err) => {
                        return res.status(500).json({msg: err.message})
                    })
                    return res.json({msg: `Pokemon ${name} created`})
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({msg: error.message})
                }
            } else {
                return res.status(401).json({msg: `Pokemon's name: ${name} already exists`})
            }
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = postPokemonHandler