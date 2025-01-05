/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  setupFiles: ["dotenv/config"], // Automatically loads .env
  setupFilesAfterEnv: ["<rootDir>/setup.ts"], // Ensures `setup.ts` is loaded globally
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};