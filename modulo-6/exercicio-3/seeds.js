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

const alunos = [
  { nome: "Ana Souza", email: "ana@email.com", idade: 22, curso: "Web", notas: [8, 9, 7] },
  { nome: "Bruno Lima", email: "bruno@email.com", idade: 19, curso: "Redes", notas: [5, 6, 4] },
  { nome: "Carla Mendes", email: "carla@email.com", idade: 25, curso: "Web", notas: [10, 9, 8] },
  { nome: "Diego Rocha", email: "diego@email.com", idade: 18, curso: "Sistemas", notas: [6, 7, 5] },
  { nome: "Eduarda Costa", email: "edu@email.com", idade: 21, curso: "Web", notas: [7, 8, 9] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Conectado ao MongoDB Atlas");

  await Aluno.deleteMany({});
  const inseridos = await Aluno.insertMany(alunos);
  console.log(`${inseridos.length} alunos inseridos`);

  await mongoose.disconnect();
  console.log("Concluído");
}

seed().catch(console.error);
