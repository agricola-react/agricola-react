module.exports = {
  projects: ['<rootDir>/'],
  testRegex: '\\.test\\.(ts|js)x?$',
  moduleNameMapper: {
    'pages(.*)$': '<rootDir>/pages/$1',
    'page-src(.*)$': '<rootDir>/page-src/$1',
    'shared(.*)$': '<rootDir>/shared/$1',
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
