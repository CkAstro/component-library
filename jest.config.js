/* eslint-env node */

module.exports = {
   clearMocks: true,
   restoreMocks: true,
   collectCoverage: true,
   collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/Display.tsx', // purely for component display purposes
      '!src/index.tsx',
      '!src/test/**',
      '!src/routes/**',
      '!src/components/App/**',
      '!src/components/Sidebar/**',
   ],
   coverageDirectory: 'coverage',
   coverageReporters: ['text-summary', 'lcov'],
   coverageThreshold: {
      global: {
         branches: 90,
         functions: 90,
         lines: 90,
         statements: 90,
      },
   },
   errorOnDeprecated: true,
   moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg|bmp|woff|woff2|ttf)$': '<rootDir>/test/src/mocks/fileMock.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '@/(.*)$': '<rootDir>/src/$1',
   },
   setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
   globalTeardown: '<rootDir>/src/test/teardown.ts',
   fakeTimers: {
      enableGlobally: true,
   },
   verbose: true,
   testEnvironment: 'jsdom',
};
