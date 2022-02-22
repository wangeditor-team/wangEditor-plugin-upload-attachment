module.exports = {
  roots: ['<rootDir>/test'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/test/setup/stylesMock.js',

    // import `dom7` 时默认是 esm 格式，换成 umd 格式
    dom7: '<rootDir>/node_modules/dom7/dom7.js',
  },
  transformIgnorePatterns: ['node_modules'],
  setupFilesAfterEnv: ['<rootDir>/test/setup/index.ts'],
}
