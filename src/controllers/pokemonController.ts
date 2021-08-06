import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getAllPokemons (req: Request, res: Response) {
    const pokemons = await pokemonService.getPokemons();
    res.send(pokemons);
}
