function calcularDesconto(preco, percentual) {
  const desconto = (preco * percentual) / 100;
  return preco - desconto;
}

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

module.exports = { calcularDesconto, formatarMoeda };
