require("dotenv").config();
const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  nome: String,
  email: String,
  idade: Number,
  curso: String,
  notas: [Number],
});

const Aluno = mongoose.model("Aluno", alunoSchema);

async function executar() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado ao MongoDB Atlas\n");

  // Buscar aluno por nome
  const porNome = await Aluno.findOne({ nome: "Ana Souza" });
  console.log("Busca por nome (Ana Souza):", porNome);

  // Filtrar alunos com idade > 20
  const maisDe20 = await Aluno.find({ idade: { $gt: 20 } });
  console.log("\nAlunos com idade > 20:", maisDe20.map(a => a.nome));

  // Ordenar por nota média (usando aggregation)
  const porMedia = await Aluno.aggregate([
    { $addFields: { media: { $avg: "$notas" } } },
    { $sort: { media: -1 } },
    { $project: { nome: 1, media: 1 } },
  ]);
  console.log("\nOrdenados por média:", porMedia.map(a => `${a.nome} — ${a.media.toFixed(1)}`));

  // Atualizar a idade de um aluno
  await Aluno.updateOne({ nome: "Bruno Lima" }, { $set: { idade: 20 } });
  const brunoAtualizado = await Aluno.findOne({ nome: "Bruno Lima" });
  console.log("\nIdade do Bruno após update:", brunoAtualizado.idade);

  // Adicionar uma nota ao array de notas
  await Aluno.updateOne({ nome: "Diego Rocha" }, { $push: { notas: 9 } });
  const diegoAtualizado = await Aluno.findOne({ nome: "Diego Rocha" });
  console.log("\nNotas do Diego após push:", diegoAtualizado.notas);

  // Remover um aluno pelo email
  await Aluno.deleteOne({ email: "edu@email.com" });
  const total = await Aluno.countDocuments();
  console.log(`\nApós remover Eduarda, total de alunos: ${total}`);

  await mongoose.disconnect();
  console.log("\nConcluído");
}

executar().catch(console.error);
