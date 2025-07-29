import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  forbidOnly: false,
  globalSetup: './global-setup.ts',

  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  workers: 4,
  fullyParallel: false, 

  use: {
    baseURL: "https://www.saucedemo.com/v1",
    headless: false,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: 'auth-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /check-login\.spec\.ts/, 
    },
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'other tests',
      dependencies: ["setup"],
      testIgnore: 'tests/login-users/**',
      testMatch: /.\.spec\.ts/,
       use: {
        storageState: "state.json",
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
