// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    '^test-utils(.*)$': '<rootDir>/test-utils$1',
    'test-utils': '<rootDir>/test-utils',
    'high-order-components(.*)$': '<rootDir>/high-order-components/$1',
  },
  reporters: [['jest-silent-reporter', { showWarnings: true, useDots: true, showPaths: true }]],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: ['<rootDir>/src/**/*.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  verbose: true,
};
