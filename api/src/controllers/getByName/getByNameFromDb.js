require("dotenv").config()
const {Pokemon, Type} = require("../../db")

async function getByNameFromDb(name) {
    try {
        const pokemonFound = await Pokemon.findOne({
            where: {name: name.toLowerCase()},
            include:[{
                model: Type,
                attributes: ['name'],
                through: {attributes: []}
            }]
        })
        if(!pokemonFound){
            return null
        }
        const pokemon = {
            id: pokemonFound.id,
            name: pokemonFound.name,
            image: pokemonFound.image,
            hp: pokemonFound.hp,
            attack: pokemonFound.attack,
            defense: pokemonFound.defense,
            speed: pokemonFound.speed,
            height: pokemonFound.height,
            weight: pokemonFound.weight,
            types: pokemonFound.types.map((type) => type.name)
        }
        return pokemon
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getByNameFromDb