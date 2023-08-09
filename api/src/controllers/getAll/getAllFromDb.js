const {Pokemon, Type} = require("../../db")

async function getAllFromDb() {
    try {
        const pokemonsFound = await Pokemon.findAll({ // Se consulta la db por la totalidad de pokemons, incluyendo sus respectivos types asociados
            include: [{
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }]
        })
        const pokemons = pokemonsFound.map((pokemon) => ({ // Se crea un array de objetos, y se recupera en cada caso solo el name de la tabla types
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
        return pokemons // Devuelve el array con los pokemons
    } catch (err) {
        return {err: {status: 500, msg: err.message}} // Devuelve un error en caso de existir
    }
}

module.exports = getAllFromDb