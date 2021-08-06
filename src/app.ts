import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";
import { error} from "./middlewares/error";
import { authMiddleware } from "./middlewares/authMiddleware";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";

const app = express();
app.use(cors());
app.use(express.json());

app.use(error);

app.post("/sign-up",userController.signUp);
app.post("/sign-in", userController.signIn);


app.get("/pokemons", authMiddleware, pokemonController.getAllPokemons);

export async function init () {
  await connectDatabase();
}

export default app;
