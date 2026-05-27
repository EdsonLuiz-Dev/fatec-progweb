const express = require("express");
const autenticar = require("./middlewares/auth");
const authRoutes = require("./routes/auth.routes");
const alunoRoutes = require("./routes/aluno.routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/auth", authRoutes);
app.use("/alunos", autenticar, alunoRoutes);

module.exports = app;
