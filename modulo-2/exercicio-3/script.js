const produtos = [
  { nome: "Notebook Dell", preco: 3499.99, categoria: "Eletrônico" },
  { nome: "Camiseta Básica", preco: 49.90, categoria: "Roupas" },
  { nome: "Smartphone Samsung", preco: 1899.00, categoria: "Eletrônico" },
  { nome: "Livro JavaScript", preco: 89.90, categoria: "Livros" },
  { nome: "Fone de Ouvido", preco: 259.00, categoria: "Eletrônico" },
];

const container = document.getElementById("container");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnLimpar = document.getElementById("btn-limpar");

produtos.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.categoria = produto.categoria;

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
    <p class="categoria">${produto.categoria}</p>
  `;

  container.appendChild(card);
});

btnFiltrar.addEventListener("click", () => {
  const cards = container.querySelectorAll(".card");
  cards.forEach(card => {
    const isEletronico = card.dataset.categoria === "Eletrônico";
    card.classList.toggle("hidden", !isEletronico);
  });
});

btnLimpar.addEventListener("click", () => {
  container.innerHTML = "";
});
