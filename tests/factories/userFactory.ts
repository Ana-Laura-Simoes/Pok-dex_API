import { getRepository } from "typeorm";
import faker from "faker";

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
  const newUser = await getRepository(User).create(user);
  await getRepository(User).save(newUser);
  return newUser;
}

