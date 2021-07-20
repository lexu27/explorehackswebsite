const path = require('path');

module.exports = {
  mode: "development",
  entry: ["./js/magic.js","./js/password.js", "./js/paper.js"],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname)
  },
  
};