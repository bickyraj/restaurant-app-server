const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
    extensions: ['.js', '.json'], // You can add more extensions if needed
  },
};