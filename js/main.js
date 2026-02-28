const API_KEY = "a3fda9b9d1d0aaee95df37313c16684e";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const campoPesquisa = document.getElementById("campoPesquisa");
const botaoPesquisa = document.getElementById("botaoPesquisa");
const filmesGrid = document.getElementById("FilmesGrid");

const inicio = document.getElementById("inicio");
const filmes = document.getElementById("filmes");
const series = document.getElementById("series");

async function requisicaoURL(url) {
    try {
        filmesGrid.classList.add("fade-out");
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
        const data = await response.json();
        setTimeout(() => {
            renderizarTitulos(data.results);
            filmesGrid.classList.remove("fade-out");
            filmesGrid.classList.add("fade-in");
            setTimeout(() => {
                filmesGrid.classList.remove("fade-in");
            }, 300);
        }, 200);
    } catch (error) {
        console.error("Erro:", error);
        filmesGrid.innerHTML = "<p>Erro ao carregar filmes. </p>";
    }
}
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "pacity 0.5s ease";
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

function renderizarTitulos(filmes) {
    filmesGrid.innerHTML = "";
    if (!filmes || filmes.length === 0) {
        filmesGrid.innerHTML = "<p>Nenhum filme encontrado.</p>"
        return;
    }
    filmes.forEach(filme => {
        const card = document.createElement("div");
        card.classList.add("card");
        const imagem = filme.poster_path ? IMAGE_URL + filme.poster_path : "";
        const titulo = filme.title || filme.name;
        card.innerHTML = `
            <img src="${imagem}" alt="${filme.title}">
            <h3>${titulo}</h3>`;
        card.addEventListener("click", () => {
            window.location.href = `pages/detalhe.html?id=${filme.id}&type=${filme.media_type}`;
        })
        filmesGrid.appendChild(card);
    })
}
function pesquisaGeral() {
    const informacao = campoPesquisa.value.trim();
    if (informacao == "") {
        carregarTendenciasGeral();
        return;
    };
    console.log("Pesquisando por:", informacao);
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(informacao)}&language=pt-BR`;
    console.log(url);
    requisicaoURL(url);
    campoPesquisa.value = "";

}
botaoPesquisa.addEventListener("click", pesquisaGeral);
campoPesquisa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        pesquisaGeral();
    }
});

document.addEventListener("DOMContentLoaded", carregarTendenciasGeral);
inicio.addEventListener("click", carregarTendenciasGeral);
filmes.addEventListener("click", buscaFilme);
series.addEventListener("click", buscaSerie);

function carregarTendenciasGeral() {
    const url = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
};
function buscaFilme() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
};
function buscaSerie() {
    const url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=pt-BR`;
    requisicaoURL(url);
};
const botaoTema = document.getElementById("botaoTema");
botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-claro");
});

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo === "filme") {
        buscaFilme();
    } else if (tipo === "serie") {
        buscaSerie();
    } else {
        carregarTendenciasGeral();
    }
});