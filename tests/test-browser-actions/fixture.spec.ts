import { test as base } from '@playwright/test';

type MyFixtures = {
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  authToken: async ({}, use) => {
    const token = 'abc123';
    await use(token);
  },
});

test('should use token', async ({ authToken }) => {
  console.log('Token is', authToken);
});