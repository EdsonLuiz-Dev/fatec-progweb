const coresPorTipo = {
  fire: "#e25c4a",
  water: "#4a90e2",
  grass: "#4caf50",
  electric: "#f0c030",
  psychic: "#e256a0",
  ice: "#74d0f0",
  dragon: "#7038f8",
  dark: "#705848",
  fairy: "#f0a0e0",
  normal: "#a8a878",
  fighting: "#c03028",
  flying: "#98a8d0",
  poison: "#a040a0",
  ground: "#e0c068",
  rock: "#b8a038",
  bug: "#a8b820",
  ghost: "#705898",
  steel: "#b8b8d0",
};

const input = document.getElementById("input-pokemon");
const btnBuscar = document.getElementById("btn-buscar");
const resultado = document.getElementById("resultado");

async function buscarPokemon() {
  const nome = input.value.trim().toLowerCase();
  if (!nome) return;

  resultado.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    if (!res.ok) throw new Error("não encontrado");

    const data = await res.json();

    const tipos = data.types.map(t => t.type.name);
    const corFundo = coresPorTipo[tipos[0]] || "#555";

    const statsDesejadas = ["hp", "attack", "defense", "speed"];
    const statsHtml = data.stats
      .filter(s => statsDesejadas.includes(s.stat.name))
      .map(s => `
        <div class="stat">
          <div class="stat-label">${s.stat.name}</div>
          <div class="stat-valor">${s.base_stat}</div>
        </div>
      `).join("");

    const tiposHtml = tipos.map(t => `<span class="tipo-badge">${t}</span>`).join("");

    resultado.innerHTML = `
      <div class="card-pokemon" style="background: ${corFundo};">
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name}</h2>
        <div class="tipos">${tiposHtml}</div>
        <div class="stats">${statsHtml}</div>
      </div>
    `;
  } catch {
    resultado.innerHTML = `<p class="erro">Pokémon não encontrado</p>`;
  }
}

btnBuscar.addEventListener("click", buscarPokemon);

input.addEventListener("keydown", e => {
  if (e.key === "Enter") buscarPokemon();
});
