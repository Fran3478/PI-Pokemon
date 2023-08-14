import Card from "../Card/Card"

function Cards(props) {

    return (
        <div>
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