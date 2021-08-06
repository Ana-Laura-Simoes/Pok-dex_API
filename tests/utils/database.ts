import {getManager } from "typeorm";

export async function clearDatabase () {
  await getManager().query(`TRUNCATE "users" RESTART IDENTITY CASCADE`);
  await getManager().query(`TRUNCATE "sessions" RESTART IDENTITY CASCADE`);
  await getManager().query(`TRUNCATE "pokemons" RESTART IDENTITY CASCADE`);
}