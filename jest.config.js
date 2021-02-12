process.env.BASE_PATH = __dirname;

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/(__test__)/.*|(\\.|/))\\.test\\.tsx?$',
  modulePathIgnorePatterns: ['/modules', '/_modules'],
  testPathIgnorePatterns: ['node_modules/', 'dist/'],
  maxConcurrency: 25,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node', 'json'],
  coveragePathIgnorePatterns: [],
};
