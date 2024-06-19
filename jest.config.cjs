module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js', // Exclude index.js if it only renders your app
    '!src/serviceWorker.js', // Exclude serviceWorker.js if you have it
    '!src/setupTests.js' // Exclude setupTests.js
  ],
  coverageReporters: ['text', 'lcov'],
};

