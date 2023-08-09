/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'nuevopokemon',
  image: 'urlImagen',
  hp: 10,
  attack: 10,
  defense:10,
  speed: 10,
  weight: 10,
  height: 10,
  types: ["fire", "flying"]
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('POST /pokemons', () => {
    it('sending a pokemon should get 200 and receive a verification', async () => {
      const res = await agent.post('/pokemons').send(pokemon)
      expect(res.status).to.equal(200)
      expect(res.body.msg).to.equal(`Pokemon ${pokemon.name} created`)
    })
    
  })
  describe('GET /pokemons', () => {
    it('should get 200', async () => {
      const res = await agent.get('/pokemons')
      expect(res.status).to.equal(200)
    }).timeout(0)
  });
  
  describe('GET /pokemons?name="pokemon"', () => {
    it('should get 200', async () => {
      const res = await agent.get(`/pokemons?name=${pokemon.name}`)
      expect(res.status).to.equal(200)
    })
  })
  
});
