module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'lint',
  testMatch: ['<rootDir>/src/**/*.js'],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  reporters: [['jest-silent-reporter', { showWarnings: true, useDots: true, showPaths: true }]],
};
