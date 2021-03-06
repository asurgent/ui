module.exports = {
  projects: [
    '<rootDir>/jest-test.config.js',
    '<rootDir>/jest-eslint.config.js',
  ],
  moduleNameMapper: {
    '^test-utils(.*)$': '<rootDir>/test-utils$1',
    'test-utils': '<rootDir>/test-utils',
    'high-order-components(.*)$': '<rootDir>/high-order-components/$1',
  },
};
