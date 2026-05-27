require("dotenv").config();
const app = require("./app");
const { conectar } = require("./config/database");

const PORT = process.env.PORT || 3000;

conectar().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Falha ao conectar ao banco:", err.message);
  process.exit(1);
});
