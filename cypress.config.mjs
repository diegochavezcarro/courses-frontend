import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite's default port
    supportFile: false, // Disable support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000, // Increase default command timeout to 10 seconds
    responseTimeout: 20000, // Increase response timeout to 20 seconds
  },
});


