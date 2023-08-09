const {Pokemon, Type} = require("../../db")

async function getByIdFromDb(idPokemon) {
    try {
        const pokemonFound = await Pokemon.findOne({ // Se consulta a la db por el primero que coincida con el nombre recibido, incluyendo la tabla type para los valores relacionados
            where: {id: idPokemon},
            include:[{
                model: Type,
                attributes: ['name'],
                through: {attributes: []}
            }]
        })
        if(!pokemonFound){ // Si la respuesta es nulo significa que no hubo coincidencia por ende se responde con un mensaje apropiado
            return {err: {status: 404, msg: "Pokemon Id Not Found"}}
        }
        const pokemon = { // Se crea el objeto con las propiedades necesarias, y obteniendo solo los nombres de los objetos type correspondientes
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
        return {err: {status: 500, msg: err.message}} // En caso de error se devuelve un obj de error
    }
}

module.exports = getByIdFromDb