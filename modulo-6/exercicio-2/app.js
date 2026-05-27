const express = require("express");
const tarefasRoutes = require("./routes/tarefas.routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/tarefas", tarefasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
