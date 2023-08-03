const {Pokemon, Type} = require("../db")
const getByNameFromApi = require("./getByName/getByNameFromApi")
const getByNameFromDb = require("./getByName/getByNameFromDb")
async function postPokemon(req, res) {
    const {name, image, hp, attack, defense, speed, height, weight} = req.body
    try {
        if(!name || !image || !hp || !attack || !defense) {
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
                    await Pokemon.create({
                        name: name.toLowerCase(),
                        image,
                        hp: Number(hp),
                        attack: Number(attack),
                        defense: Number(defense),
                        speed: Number(speed),
                        height: Number(height),
                        weight: Number(weight)
                    })
                } catch (error) {
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
module.exports = postPokemon