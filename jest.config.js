module.exports = {
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./reports/jest",
        outputName: "jest-junit.xml",
        reportTestSuiteErrors: true,
      },
    ],
  ],
  modulePathIgnorePatterns: ["./src/index.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.js"],
  coverageDirectory: "./reports/coverage",
  coverageReporters: ["text", "html", "cobertura", "clover"],
  maxWorkers: 1,
  testMatch: ["**/test/**/*.test.js?(x)"],
};
