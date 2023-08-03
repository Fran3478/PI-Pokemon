require("dotenv").config()
const {API_URL} = process.env
const axios = require("axios")
const {Pokemon, Type} = require("../db")

async function getAllPokemons(req, res) {
    
}

module.exports = getAllPokemons