import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import userPokemons from "./userPokemons";

@Entity("pokemons")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  @Column('boolean', {default: false})
  inMyPokemons: boolean;

  @OneToMany(() => userPokemons, userPokemons => userPokemons.pokemon)
  pokemonsUser: userPokemons[];
}