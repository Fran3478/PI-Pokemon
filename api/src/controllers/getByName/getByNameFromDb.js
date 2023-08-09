require("dotenv").config()
const {Pokemon, Type} = require("../../db")

async function getByNameFromDb(name) {
    try {
        const pokemonFound = await Pokemon.findOne({ // Se consulta a la db por el nombre recibido, incluyendo los types asociados
            where: {name: name.toLowerCase()},
            include:[{
                model: Type,
                attributes: ['name'],
                through: {attributes: []}
            }]
        })
        if(!pokemonFound){ // En caso de recibir una respuesta nula se devuelve null al handler
            return null
        }
        const pokemon = { // Se crea un objeto con todas las propiedades requeridas y se obtiene unicamente los names de los types
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
        return pokemon // Devuelve el objeto creado
    } catch (err) {
        return {err: {status: 500, msg: err.message}} // En caso de error devuelve un objeto de error
    }
}

module.exports = getByNameFromDb