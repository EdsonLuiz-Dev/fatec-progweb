const express = require("express");
const alunoRoutes = require("./routes/aluno.routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/alunos", alunoRoutes);

module.exports = app;
