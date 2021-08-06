import { getRepository } from "typeorm";
import faker from "faker";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

interface user{
  email: string,
  password:string
}

export async function createUser () :Promise <user>{
  const user : user = {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
  return user;
}

export async function createInvalidUser () : Promise <user>{
  const user ={
    email: faker.name.firstName(),
    password: faker.internet.password()
  };

  return user;
}

export async function insertUser (user:user) :Promise <User> {
  const {email,password}=user;
  const hashedPassword = bcrypt.hashSync(password,10);
  const newUser = await getRepository(User).create({email:email,password:hashedPassword});
  await getRepository(User).save(newUser);
  return newUser;
}

