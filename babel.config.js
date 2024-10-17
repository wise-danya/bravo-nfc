module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          extensions: [".ts", ".tsx"],
          root: "./src",
          alias: {
            app: "./src/app",
            screens: "./src/screens",
            features: "./src/features",
            shared: "./src/shared",
          },
        },
      ],
    ],
  }
}
