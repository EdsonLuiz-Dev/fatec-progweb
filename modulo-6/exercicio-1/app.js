const fs = require("fs");
const http = require("http");
const { calcularDesconto, formatarMoeda } = require("./utils");

const preco = 350;
const percentual = 20;
const precoFinal = calcularDesconto(preco, percentual);

const linhas = [
  `Preço original: ${formatarMoeda(preco)}`,
  `Desconto: ${percentual}%`,
  `Preço com desconto: ${formatarMoeda(precoFinal)}`,
];

linhas.forEach(l => console.log(l));

fs.writeFileSync("resultado.txt", linhas.join("\n"));
console.log("Resultado salvo em resultado.txt");

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Exercício 1</title></head>
<body style="font-family:sans-serif;padding:30px">
  <h1>Resultado do Cálculo</h1>
  <ul>
    ${linhas.map(l => `<li>${l}</li>`).join("\n    ")}
  </ul>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
