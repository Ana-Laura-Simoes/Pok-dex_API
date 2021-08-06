import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";


export async function getPokemons () {
  const pokemons = await getRepository(Pokemon).find();
  return pokemons;
}
