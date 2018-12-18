const path = require("path");

module.exports = {
  mode: "development",
  context: path.join(__dirname, "src"),
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js"
  },
	devServer: {
		open: true,
		stats: 'errors-only',
		openPage: '/www'
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
			{
				test: /\.(s*)css$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			}
    ]
  }
};
