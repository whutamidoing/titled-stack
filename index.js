// Load environment variables from .env
import "dotenv/config"; // ESM style
// OR for CommonJS: require('dotenv').config();

console.log(process.env.DATABASE_URL);
