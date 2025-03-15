module.exports = {
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "^axios$": require.resolve("axios"),
    },
    testEnvironment: "jsdom",
  };
  