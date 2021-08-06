import { Request, Response } from "express";

import {signUpSchema} from "../Schemas/userSchema";

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

  const { error } = signUpSchema.validate(req.body);
  if (error) return res.sendStatus(400);
  
  const existingUser = await userService.getUserByEmail(req.body.email);
  if(existingUser) return res.sendStatus(409);
  
   
  else{
    const result = await userService.createUser(req.body);
    return res.sendStatus(201);
  }


}
