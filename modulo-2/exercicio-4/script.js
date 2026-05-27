const form = document.getElementById("form");
const inputTarefa = document.getElementById("input-tarefa");
const lista = document.getElementById("lista");
const busca = document.getElementById("busca");

form.addEventListener("submit", e => {
  e.preventDefault();

  const texto = inputTarefa.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.innerHTML = `<span>${texto}</span><button class="btn-remover">✕</button>`;
  lista.appendChild(li);

  inputTarefa.value = "";
});

lista.addEventListener("click", e => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.classList.contains("btn-remover")) {
    li.remove();
    return;
  }

  li.classList.toggle("concluida");
});

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();
  const itens = lista.querySelectorAll("li");

  itens.forEach(li => {
    const texto = li.querySelector("span").textContent.toLowerCase();
    li.style.display = texto.includes(termo) ? "" : "none";
  });
});
