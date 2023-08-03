require("dotenv").config()
const {Pokemon, Type} = require("../../db")

async function getByNameFromDb(name) {
    try {
        const pokemon = await Pokemon.findOne({
            where: {name: name.toLowerCase()},
            include: Type
        })
        if(!pokemon){
            return null
        }
        return pokemon
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getByNameFromDb