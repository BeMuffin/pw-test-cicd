import { test, expect, request } from "@playwright/test";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY;

test.only("should get a user with id 2", async () => {
  const context = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: {
      "x-api-key": apiKey || "",
    },
  });

  const response = await context.get("/api/users/2");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data).toHaveProperty("id", 2);
});

test("should create a user", async () => {
  const context = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: {
      "x-api-key": apiKey || "",
    },
  });

  const reqBody = {
    name: "John",
    job: "QA Engineer",
  };
  const response = await context.post("/api/users", {
    data: reqBody,
  });

  const body = await response.json();

  expect(response.status()).toBe(201);
  expect(body).toHaveProperty("name", "John");
  expect(body).toHaveProperty("job", "QA Engineer");
  expect(body).toHaveProperty("id");
  expect(body).toHaveProperty("createdAt");
});

test("Mock GET /users and verify response", async ({ page }) => {
  await page.route(
    "https://jsonplaceholder.typicode.com/users",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          { id: 1, name: "Mocked User 1" },
          { id: 2, name: "Mocked User 2" },
        ]),
      });
    }
  );

  await page.goto("data:text/html,<html></html>");

  const users = await page.evaluate(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
  });

  console.log(users)

  expect(users).toEqual([
    { id: 1, name: "Mocked User 1" },
    { id: 2, name: "Mocked User 2" },
  ]);
});

test("Login and save token to .env", async () => {
  const context = await request.newContext({
    baseURL: "https://reqres.in",
    extraHTTPHeaders: {
      "x-api-key": apiKey || "",
    },
  });
  const res = await context.post("https://reqres.in/api/login", {
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });

  expect(res.status()).toBe(200);
  const body = await res.json();
  const token = body.token;
  expect(token).toBeDefined();

  fs.appendFileSync(".env", `AUTH_TOKEN=${token}\n`);
});

// test("Login and save token to .env", async () => {
//   const context = await request.newContext({
//     baseURL: "https://reqres.in",
//     extraHTTPHeaders: {
//       "x-api-key": apiKey || "",
//       "Bearer": process.env.AUTH_TOKEN || "",
//     },
//   });
//   const res = await context.get("https://reqres.in/api/unknown");
//   const responseJson = await res.json()
//   expect(res.status()).toBe(200)
//   expect(responseJson).toHaveProperty("data", []);
// });



test('GET user by id', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data.data.email).toBe('janet.weaver@reqres.in');
});



test('Create new user', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'Anna',
      job: 'QA Engineer'
    }
  });

  expect(response.status()).toBe(201);
  const json = await response.json();
  expect(json).toHaveProperty('id');
});

