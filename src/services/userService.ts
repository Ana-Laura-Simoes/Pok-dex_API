import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

interface user{
  email: string,
  password:string
}

export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

export async function createUser(newUser:user) {
  const {email,password} = newUser;
  const repository = getRepository(User);
  const hashedPassword = bcrypt.hashSync(password,10);
  await repository.insert({email,password:hashedPassword});
}

export async function getUserByEmail(email: string) {
  const result = await getRepository(User).findOne({
    where: { email }
  });
  return result;
}