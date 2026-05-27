const model = require("../models/tarefas.model");

function listar(req, res) {
  res.json(model.listarTodas());
}

function criar(req, res) {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: "titulo é obrigatório" });
  const tarefa = model.criar(titulo);
  res.status(201).json(tarefa);
}

function atualizar(req, res) {
  const id = parseInt(req.params.id);
  const tarefa = model.atualizar(id, req.body);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(tarefa);
}

function remover(req, res) {
  const id = parseInt(req.params.id);
  const removida = model.remover(id);
  if (!removida) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.status(204).send();
}

module.exports = { listar, criar, atualizar, remover };
