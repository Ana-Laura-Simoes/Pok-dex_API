import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser , createInvalidUser, insertUser} from "../factories/userFactory";
import { clearDatabase } from "../utils/database";


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


describe("POST /sign-up", () => {
  it("should answer with status 400 for invalid email", async () => {
    const user = await createInvalidUser();

    const response = await supertest(app).post('/sign-up').send({
      "email":user.email,
      "password":user.password,
      "confirmPassword": user.password
    });

    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for different passwords", async () => {
    const user = await createUser();

    const response = await supertest(app).post('/sign-up').send({
      "email":user.email,
      "password":user.password,
      "confirmPassword": "invalidPassword"
    });

    expect(response.status).toBe(400);
  });


  it("should answer with status 409 for email already registered", async () => {
    const user = await createUser();
    const existingUser = await insertUser(user);

    const response = await supertest(app).post('/sign-up').send({
      "email":user.email,
      "password":user.password,
      "confirmPassword": user.password
    });

    expect(response.status).toBe(409);
  });


  it("should answer with status 201 for valid params", async () => {
    const user = await createUser();

    const response = await supertest(app).post('/sign-up').send({
      "email":user.email,
      "password":user.password,
      "confirmPassword": user.password
    });

    expect(response.status).toBe(201);
  });
});










describe("POST /sign-in", () => {

  it("should answer with status 400 for invalid email", async () => {
    const user = await createInvalidUser();

    const response = await supertest(app).post('/sign-in').send({
      "email":user.email,
      "password":user.password
    });
    expect(response.status).toBe(400);
  });


  it("should answer with status 401 for wrong user email", async () => {
    const user = await createUser();
    const newUser = await insertUser(user);

    const response = await supertest(app).post('/sign-in').send({
      "email":"notuser@email.com",
      "password":user.password
    });
    expect(response.status).toBe(401);
  });

 it("should answer with status 401 for wrong user password", async () => {
    const user = await createUser();
    const newUser = await insertUser(user);

    const response = await supertest(app).post('/sign-in').send({
      "email": user.email,
      "password": "notuser"
    });
    expect(response.status).toBe(401);
  });


  it("should answer with token and status 200 for valid params", async () => {
    const user = await createUser();
    const newUser = await insertUser(user);

    const response = await supertest(app).post('/sign-in').send({
      "email": user.email,
      "password": user.password
    });

    expect(response.body).toEqual(
        expect.objectContaining({token:expect.any(String)})
    );
    expect(response.status).toBe(200);
  });

});