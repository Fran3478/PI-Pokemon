const {Pokemon, Type} = require("../../db")

async function getAllFromDb() {
    try {
        const pokemonsFound = await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }]
        })
        const pokemons = pokemonsFound.map((pokemon) => ({
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types.map((type) => type.name)
        }))
        return pokemons
    } catch (error) {
        return {err: {status: 500, msg: error.message}}
    }
}

module.exports = getAllFromDb