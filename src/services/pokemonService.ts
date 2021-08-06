import { getRepository, getConnection, createQueryBuilder } from "typeorm";

import Pokemon from "../entities/Pokemon";
import UserPokemons from "../entities/userPokemons";


export async function MyPokemons(userId:number):Promise <number[]> {
    const pokemons= await getRepository(UserPokemons).find({ where: { userId} });
    let pokemonsID = [];

    if(!pokemons) return null;  
    else {
       pokemonsID = pokemons.map((p)=>{
        return p.pokemonId
       });
        return pokemonsID;   
    };
  }

export async function getPokemons (userId:number): Promise <Pokemon[]> {
  const repository = getRepository(Pokemon);
 
  const pokemons =await repository.createQueryBuilder('pokemons').
  orderBy('pokemons.id','ASC').getMany()
  
  const myList = await MyPokemons(userId)

   pokemons.map((p)=> {
       if(myList.includes(p.id)) p.inMyPokemons=true;
       else p.inMyPokemons=false;
   })
  return pokemons;
}

export async function addToMyPokemons (userId: number, pokemonId: number):Promise <Boolean> {

    const user = await getRepository(UserPokemons).find({ where: { userId } });
    let alreadyMine = false;
    user.map((u)=>{    
      if(u.pokemonId===pokemonId) {
            alreadyMine = true
        }
    })

    if (alreadyMine) return false;

     await getRepository(UserPokemons).insert({ userId, pokemonId });
      return true;
  }


  export async function deleteFromMyPokemons (userId: number, pokemonId: number) {

    const pokemon = await getRepository(UserPokemons).findOne({ where: { userId,pokemonId } });

    if(!pokemon) return false;

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(UserPokemons)
    .where("userId = :userId AND pokemonId = :pokemonId", { userId, pokemonId })
    .execute();

      return pokemon;
  }


