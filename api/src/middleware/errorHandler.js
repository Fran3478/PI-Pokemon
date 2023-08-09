// Middleware manejador de errores modularizado y adaptado
// En caso de recibir valores personalizados los asigna, de lo contrario solamente devuelve un status 500 y el error que reciba
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const msg = err.msg || err
    console.error(err)
    res.status(status).json({msg})
}

module.exports = errorHandler