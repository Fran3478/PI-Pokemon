import bug from '../assets/pokemonTypes/bug.png'
import dark from '../assets/pokemonTypes/dark.png'
import dragon from '../assets/pokemonTypes/dragon.png'
import electric from '../assets/pokemonTypes/electric.png'
import fairy from '../assets/pokemonTypes/fairy.png'
import fighting from '../assets/pokemonTypes/fighting.png'
import fire from '../assets/pokemonTypes/fire.png'
import flying from '../assets/pokemonTypes/flying.png'
import ghost from '../assets/pokemonTypes/ghost.png'
import grass from '../assets/pokemonTypes/grass.png'
import ground from '../assets/pokemonTypes/ground.png'
import ice from '../assets/pokemonTypes/ice.png'
import normal from '../assets/pokemonTypes/normal.png'
import poison from '../assets/pokemonTypes/poison.png'
import psychic from '../assets/pokemonTypes/psychic.png'
import rock from '../assets/pokemonTypes/rock.png'
import steel from '../assets/pokemonTypes/steel.png'
import water from '../assets/pokemonTypes/water.png'

const imgType = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
}

export function typeImg(type) {
  return imgType[type]
}