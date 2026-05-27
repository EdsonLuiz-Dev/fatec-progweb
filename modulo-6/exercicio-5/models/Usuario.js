const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
}, { timestamps: true });

usuarioSchema.pre("save", async function () {
  if (!this.isModified("senha")) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});

module.exports = model("Usuario", usuarioSchema);
