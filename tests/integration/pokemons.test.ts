import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser , insertUser, createSession} from "../factories/userFactory";
import { insertRelation , createPokemon } from "../factories/pokemonFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await getConnection().close();
  
});


describe("GET /pokemons", () => {

    it("should answer with status 401 for a invalid token", async () => {
        const response = await test.get("/pokemons").set("Authorization", `Bearer invalidToken`);;
        
        expect(response.status).toBe(401);
    });

    it("should answer with status 401 for no header", async () => {
        const response = await test.get("/pokemons"); 
        expect(response.status).toBe(401);
    });


    it("should answer with array of pokemons and status 200 for valid authorization", async () => {
      const pokemon = await createPokemon();

      const user = await createUser();
      const newUser = await insertUser(user);

      const token  = await createSession(user.email,newUser.id);
    
      const response = await test.get("/pokemons").set("Authorization", `Bearer ${token}`);
    
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "id":1,
            "name": pokemon.name,
            "number": 1,
            "image": pokemon.image,
            "weight": pokemon.weight,
            "height": pokemon.height,
            "baseExp": pokemon.baseExp,
            "description": pokemon.description,
            "inMyPokemons": false
          })
        ])
      );  
  
      expect(response.status).toBe(200);

    });
});


describe("POST /my-pokemons/:id/add", () => {

    it("should answer with status 401 for a invalid token", async () => {
      
        const response = await test.post("/my-pokemons/1/add").set("Authorization", `Bearer invalidToken`);
        expect(response.status).toBe(401);
    });

    it("should answer with status 401 for no header", async () => {
        const response = await test.post("/my-pokemons/1/add"); 
        expect(response.status).toBe(401);
    });


    it("should answer with status 200 for valid authorization", async () => {
      const pokemon= await createPokemon();
      const user = await createUser();
      const newUser = await insertUser(user);
     
      const token  = await createSession(user.email,newUser.id);

      const response = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${token}`);
      const pokemons = await test.get("/pokemons").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(pokemons.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
                "id":1,
                "name": pokemon.name,
                "number": 1,
                "image": pokemon.image,
                "weight": pokemon.weight,
                "height": pokemon.height,
                "baseExp": pokemon.baseExp,
                "description": pokemon.description,
                "inMyPokemons": true
          })
        ])
      );  
       
    });



    it("should answer with status 409 for already added pokemon and valid authorization ", async () => {
        const pokemon= await createPokemon();
        const user = await createUser();
        const newUser = await insertUser(user);
        
        const relation = await insertRelation (newUser.id,pokemon.id);

        const token  = await createSession(user.email,newUser.id);
  
        const response = await test.post(`/my-pokemons/${pokemon.id}/add`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(409);  
      });
});









describe("POST  /my-pokemons/:id/remove", () => {

    it("should answer with status 401 for a invalid token", async () => {
        const response = await test.post("/my-pokemons/1/remove").set("Authorization", `Bearer invalidToken`);
        expect(response.status).toBe(401);
    });

    it("should answer with status 401 for no header", async () => {
        const response = await test.post("/my-pokemons/1/remove"); 
        expect(response.status).toBe(401);
    });


    it("should answer with status 200 for valid authorization", async () => {
      const pokemon = await createPokemon();
      const user = await createUser();
      const newUser = await insertUser(user);
      const relation = await insertRelation(newUser.id, 1);
      
      const token  = await createSession(user.email,newUser.id);

      const response = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${token}`);
      const pokemons = await test.get("/pokemons").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(pokemons.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            "id":1,
            "name": pokemon.name,
            "number": 1,
            "image": pokemon.image,
            "weight": pokemon.weight,
            "height": pokemon.height,
            "baseExp": pokemon.baseExp,
            "description": pokemon.description,
            "inMyPokemons": false
          })
        ])
      );  
    });



    it("should answer with status 404 for pokemon not found and valid authorization ", async () => {
        const pokemon= await createPokemon();
        const user = await createUser();
        const newUser = await insertUser(user);

        const token  = await createSession(user.email,newUser.id);
  
        const response = await test.post(`/my-pokemons/${pokemon.id}/remove`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(404);  
      });
});

