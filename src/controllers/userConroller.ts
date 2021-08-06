import { Request, Response } from "express";

import {signUpSchema,signInSchema} from "../Schemas/userSchema";

import * as userService from "../services/userService";

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signUp(req:Request, res: Response) {
  const {email,password}=req.body as {email:string, password :string};

  const { error } = signUpSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  const insertUser = await userService.SignUp({email,password});
  if(!insertUser) return res.sendStatus(409);
  return res.sendStatus(201);
}


export async function signIn(req:Request, res: Response) {
  const {email,password}=req.body as {email:string, password :string};

  const { error } = signInSchema.validate({email,password});
  if (error) return res.sendStatus(400);
 
  const token = await userService.SignIn({email,password});
  if(!token) return res.sendStatus(401);
  
  return res.send({"token":token});
}
