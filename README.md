# Unit and e2e Testing Project


## Steps for this exercice

### 1. Execute and test the app

- a. Run the App:

The backend app should be up, use this project:

https://github.com/diegochavezcarro/courses-nest

First install runtime dependencies and development too:

npm install

npm run dev


- b. See the web frontend in http://localhost:5173/. Create a Course, Edit it, List all the Courses, Delete one, etc:


### 2. Run the Unit Tests with coverage

- a. Run the tests and coverage:

npm test

-b. See the Coverage:

See here:

courses-frontend/coverage/lcov-report/index.hmtl

Regarding mutation tests, it was not possible, Stryker is the most used tool for javascript projects, but it might not work with Vite generated React Apps.

### 3. Execute End to End Tests

Run Cypress in headless Mode:

npm run cypress:run

If doesn't work install the following in your linux (Ubuntu in my case):
sudo apt-get install -y libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb


