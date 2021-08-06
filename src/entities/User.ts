import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Pokemon from "./Pokemon";


@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.user)
  pokemons:Pokemon[]
}
