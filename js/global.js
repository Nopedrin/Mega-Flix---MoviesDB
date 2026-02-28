document.addEventListener("DOMContentLoaded", function () {

    const inicio = document.getElementById("inicio");
    const filmes = document.getElementById("filmes");
    const series = document.getElementById("series");
    const botaotema = document.getElementById("botaoTema");

    if (inicio) {
        inicio.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "../index.html";
        });
    }

    if (filmes) {
        filmes.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "../index.html?tipo=filme";
        });
    }

    if (series) {
        series.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "../index.html?tipo=serie";
        });
    }

    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
    }

    if (botaotema) {
        botaotema.addEventListener("click", () => {
            document.body.classList.toggle("tema-claro");
            
            const temaAtual = document.body.classList.contains("tema-claro")
                ? "claro"
                : "escuro";
                
            localStorage.setItem("tema", temaAtual);
        });
    }
});