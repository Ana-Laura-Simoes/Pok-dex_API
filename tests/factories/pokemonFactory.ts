import { getRepository, getConnection } from "typeorm";
import faker from "faker";

import UserPokemons from "../../src/entities/userPokemons"
import Pokemon from "../../src/entities/Pokemon"; 

export async function createPokemon() {
    
    const repository = getRepository(Pokemon);

    const pokemon = {
        id: 1,
        name: "Pikachu",
        number: 1,
        image: faker.image.imageUrl(),
        weight: faker.datatype.number(),
        height: faker.datatype.number(),
        baseExp: faker.datatype.number(),
        description: faker.datatype.string()
    };
    
    const newPokemon = await repository.save(pokemon);    
    
    return newPokemon;
}




export async function insertRelation (userId: number, pokemonId: number) {
     const relation = await getRepository(UserPokemons).insert({ userId, pokemonId });
      return relation;
  }
