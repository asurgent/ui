module.exports = {
  displayName: 'tests',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  moduleNameMapper: {
    '^test-utils(.*)$': '<rootDir>/test-utils$1',
    'test-utils': '<rootDir>/test-utils',
    'high-order-components(.*)$': '<rootDir>/high-order-components/$1',
  },
};
