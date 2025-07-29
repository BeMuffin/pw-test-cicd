import { test, request, expect } from '@playwright/test';
import fs from 'fs'


test('Get auth token', async ({ }) => {
  const context = await request.newContext();
  const response = await context.post('https://example.com/api/login', {
    data: {
      username: process.env.TEST_USER_NAME,
      password: process.env.TEST_PASSWORD,
    },
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  const token = body.token;

  const line = `AUTH_TOKEN=${token}\n`;
  fs.appendFileSync('.env', line);
});