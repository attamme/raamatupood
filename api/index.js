const app = require('../index');
const serverless = require('serverless-http');

console.log("✅ Loaded Express app");

module.exports = serverless(app);