// eslint-disable-next-line import/no-extraneous-dependencies
const deepmerge = require('deepmerge');
const preset = require('@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset');

module.exports = deepmerge(preset, {
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)'],
  moduleNameMapper: {
    '^~app/(.*)$': '<rootDir>/src/app/$1'
  },
  setupFiles: ['./jest.setup']
});
