import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from "./Pokemon";
import User from "./User";

@Entity("userPokemons")
export default class userPokemons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    pokemonId: number;

    @ManyToOne(() => Pokemon, pokemon => pokemon.pokemonsUser)
    pokemon: Pokemon;

    @ManyToOne(() => User, user => user.pokemonsUser)
    user: User;
}
