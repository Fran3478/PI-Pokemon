import Card from "../Card/Card"
import style from "./Cards.module.css"

function Cards(props) {

    return (
        <div className={style.container}>
            {props.pokemons.map(pokemon =>
                <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    hp={pokemon.hp}
                    attack={pokemon.attack}
                    defense={pokemon.defense}
                    speed={pokemon.speed ? pokemon.speed : null}
                    height={pokemon.height ? pokemon.height : null}
                    weight={pokemon.weight ? pokemon.weight : null}
                    types={pokemon.types}
                />
            )}
        </div>
    )
}

export default Cards