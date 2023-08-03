require("dotenv").config()
const {Pokemon, Type} = require("../../db")

async function getByIdFromDb(idPokemon) {
    
    try {
        const pokemon = await Pokemon.findOne({
            where: {id: idPokemon},
            include: Type
        })
        if(!pokemon){ 
            return {err: {status: 404, msg: "Pokemon Id Not Found"}}
        }
        return pokemon
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getByIdFromDb