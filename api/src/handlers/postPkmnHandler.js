const {Pokemon, Type} = require("../db")
const getByNameFromApi = require("../controllers/getByName/getByNameFromApi")
const getByNameFromDb = require("../controllers/getByName/getByNameFromDb")
const getTypesFromApi = require("../controllers/getTypes/getTypesFromApi")

const err = {status: null, msg: null} // Se define el objeto de error

async function postPokemonHandler(req, res, next) {
    const {name, image, hp, attack, defense, speed, height, weight, types} = req.body // Se obtienen las propiedades por body mediante destructuring
    try {
        if(!name || !image || !hp || !attack || !defense || !(Array.isArray(types) && types.length)) { // Se verifica que se reciban al menos las propiedades que no pueden ser nulas, de lo contrario se asignan status y mensaje apropiados
            err.status = 401
            err.msg = "Missing Mandatory Data"
            throw err
        }
        if(!Number(hp) || !Number(attack) || !Number(defense) || !Number(speed) || !Number(height) || !Number(weight)) { // Se verifica que las propiedades hp, attack, defense, speed, height y weight recibidas sean valores numericos, de lo contrario se asignan status y mensaje apropiado
            err.status = 401
            err.msg = "Stats must be an Integer"
            throw err
        }
        // Se consulta tanto a la api como a la db mediante el nombre recibido para verificar que no exista un pokemon con dicho nombre y evitar duplicados
        const promises = [await getByNameFromApi(name), await getByNameFromDb(name)]
        Promise.all(promises)
        .then(async (response) => {
            if(!response[0] && !response[1]) { // Si ambas promesas devuelven nulo se verifica que no existe
                try {
                    const pokemon = await Pokemon.create({ // Se crea el nuevo pokemon en la db
                        name: name.toLowerCase(),
                        image,
                        hp: Number(hp),
                        attack: Number(attack),
                        defense: Number(defense),
                        speed: Number(speed),
                        height: Number(height),
                        weight: Number(weight)
                    })
                    const dbLoad = await Type.findOne({where:{name:types[0]}}) // Para verificar que la tabla type no este vacia, re realiza una consulta por el primer name recibido
                    if(!dbLoad) { // En caso de no recibir respuesta se carga la db
                        await getTypesFromApi()
                    }
                    // Mediante un Promise.all se obtiene de la db cada uno de los types recibidos
                    const promises = types.map(async (type) => {
                        return await Type.findOne({where:{name: type}})
                    })
                    Promise.all(promises)
                    .then(async (response) => await pokemon.addType(response)) // Se genera la relacion entre el nuevo pokemon y los types correspondientes
                    .catch((error) => { // En caso de error tanto en las consultas como al generar las relaciones, se asignan el status y el mensaje recibido
                        err.status = 500
                        err.msg = error.message
                        next(err) // De existir se pasa el error al middleware encargado de manejar los errores
                    })
                    return res.json({msg: `Pokemon ${name} created`}) // Si todo se resuelve sin errores se devuelve un objeto con el mensaje de confirmacion
                } catch (error) { // Si ocurre un error se asigna el status y mensaje recibido
                    err.status = 500
                    err.msg = error.message
                    next(err) // De existir se pasa el error al middleware encargado de manejar los errores
                }
            } else { // En el caso de que se encuentre un pokemon con igual nombre, se asigna un status y mensaje correspondiente
                err.status = 401
                err.msg = `Pokemon's name: "${name}" already exists`
                throw err
            }
        })
        .catch((error) => {
            // Si el error catcheado es que se arroja al existir se asignan las propiedades pasadas, de lo contrario asigna el mensaje que se reciba y status 500
            err.status = error.status || 500
            err.msg = error.msg || error.message
            next(err)
        })
    } catch (err) {
        next(err) // De existir se pasa el error al middleware encargado de manejar los errores
    }
}
module.exports = postPokemonHandler