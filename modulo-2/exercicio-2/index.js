const alunos = [
  { nome: "Ana", nota1: 8, nota2: 7 },
  { nome: "Bruno", nota1: 5, nota2: 4 },
  { nome: "Carla", nota1: 9, nota2: 10 },
  { nome: "Diego", nota1: 3, nota2: 6 },
  { nome: "Eduarda", nota1: 7, nota2: 8 },
];

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

const alunosComMedia = alunos.map(aluno => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2),
}));

const aprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const reprovados = alunosComMedia.filter(aluno => aluno.media < 6);

const mediaDaTurma = alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0) / alunosComMedia.length;

console.log("=== Todos os alunos ===");
alunosComMedia.forEach(aluno => {
  console.log(`${aluno.nome} — Nota 1: ${aluno.nota1} | Nota 2: ${aluno.nota2} | Média: ${aluno.media}`);
});

console.log("\n=== Aprovados ===");
aprovados.forEach(aluno => console.log(`${aluno.nome} — Média: ${aluno.media}`));

console.log("\n=== Reprovados ===");
reprovados.forEach(aluno => console.log(`${aluno.nome} — Média: ${aluno.media}`));

console.log(`\nMédia geral da turma: ${mediaDaTurma}`);
