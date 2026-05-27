const { Schema, model } = require("mongoose");

const alunoSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  idade: { type: Number, min: 0 },
  curso: { type: String, required: true },
  notas: [Number],
}, { timestamps: true });

module.exports = model("Aluno", alunoSchema);
