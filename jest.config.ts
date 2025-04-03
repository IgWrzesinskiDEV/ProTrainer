import type { Config } from "jest";
import nextJest from "next/jest.js";
// jest.setup.js or jest.setup.ts
process.env.SUPPRESS_JEST_WARNINGS = "true";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Correct alias mapping for "@/..."
  },
  transform: {
    "^.+\\.(t)s$": "ts-jest",
  },
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    "/node_modules/(?!core).+\\.js$",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
