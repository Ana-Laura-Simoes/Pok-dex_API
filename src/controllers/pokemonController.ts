import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getAllPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemons = await pokemonService.getPokemons(userId);
    res.send(pokemons);
}

export async function AddMyPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = Number(req.params.id);

    const addPokemon = await pokemonService.addToMyPokemons(userId,pokemonId)
    if(!addPokemon) return res.sendStatus(409);

    else return res.sendStatus(200);
}


export async function removeFromMyPokemons (req: Request, res: Response) {
    const userId  = res.locals.userId;
    const pokemonId = Number(req.params.id);

    const removePokemon = await pokemonService.deleteFromMyPokemons(userId,pokemonId)
    if(!removePokemon) return res.sendStatus(404);
    
    else return res.send(removePokemon)
}