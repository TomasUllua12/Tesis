// config/openai.js
require("dotenv").config();           // carga tu .env

// si la librería exporta la clase por defecto, esto funciona:
const OpenAI = require("openai");     

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = openai;
