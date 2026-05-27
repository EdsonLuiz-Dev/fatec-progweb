const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

function gerarToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.create({ nome, email, senha });
    const token = gerarToken(usuario._id);
    res.status(201).json({ token, usuario: { id: usuario._id, nome, email } });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email }).select("+senha");
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Credenciais inválidas" });

    const token = gerarToken(usuario._id);
    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = { registrar, login };
