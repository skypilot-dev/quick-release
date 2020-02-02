module.exports = {
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRegex: '__tests__/.*.test.ts$',
  /* Define preprocessors */
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  verbose: false,
};
