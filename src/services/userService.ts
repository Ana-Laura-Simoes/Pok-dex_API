
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Session from "../entities/Session";

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

export async function getUserByEmail(email: string) :Promise <User> {
  const result = await getRepository(User).findOne({
    where: { email }
  });
  return result;
}


export async function createSession(userId:number, token:string) {
  const repository = getRepository(Session);
  const result = await repository.insert({token,userId});
  return result;
}


export async function SignUp(user:user):Promise <Boolean> {
  const existingUser = await getUserByEmail(user.email);

  if(existingUser) return false;

  else{
    await createUser(user);
    return true; 
  }
}

export async function SignIn(user:user){
  
  const existingUser = await getUserByEmail(user.email);
  
  if(!existingUser) {
    return false
  }
   
  if(bcrypt.compareSync(user.password,existingUser.password)){
    const token = uuid();
    await createSession(existingUser.id,token);
    return token;
  }
  else {
    return false}
}