const mongoose = require("mongoose");

async function conectar() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado ao MongoDB Atlas");
}

module.exports = { conectar };
