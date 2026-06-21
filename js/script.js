/* ============================================
   JAVASCRIPT DO PORTFÓLIO
   Funções de interação do site
   ============================================ */

// Espera a página carregar completamente antes de rodar o código
document.addEventListener("DOMContentLoaded", function () {

    // --- MENU RESPONSIVO (celular) ---
    var btnMenu = document.getElementById("btn-menu");
    var menuLista = document.getElementById("menu-lista");

    // Se o botão do menu existir na página, adiciona o clique
    if (btnMenu && menuLista) {
        btnMenu.addEventListener("click", function () {
            // Alterna a classe que mostra/esconde o menu
            menuLista.classList.toggle("menu-aberto");
        });
    }

    // --- TEMA CLARO / ESCURO ---
    var btnTema = document.getElementById("btn-tema");

    if (btnTema) {
        // Verifica se o usuário já escolheu um tema antes (salvo no navegador)
        var temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "escuro") {
            document.body.classList.add("tema-escuro");
            btnTema.textContent = "Tema Claro";
        }

        btnTema.addEventListener("click", function () {
            // Se já está escuro, volta pro claro. Se não, fica escuro.
            document.body.classList.toggle("tema-escuro");

            if (document.body.classList.contains("tema-escuro")) {
                btnTema.textContent = "Tema Claro";
                localStorage.setItem("tema", "escuro");
            } else {
                btnTema.textContent = "Tema Escuro";
                localStorage.setItem("tema", "claro");
            }
        });
    }

    // --- VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO ---
    var formulario = document.getElementById("form-contato");

    if (formulario) {
        // Mostra o modal se voltou após enviar com sucesso
        if (window.location.search.indexOf("enviado=1") !== -1) {
            document.getElementById("modal-sucesso").classList.add("aberto");
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            // Só funciona pelo site online (GitHub Pages)
            if (window.location.protocol === "file:") {
                alert("Para enviar, acesse o site online:\nhttps://ricardopfdev.github.io/portfolio/contato.html");
                return;
            }

            var nome = document.getElementById("nome").value.trim();
            var email = document.getElementById("email").value.trim();
            var mensagem = document.getElementById("mensagem").value.trim();
            var temErro = false;

            if (nome === "") {
                mostrarErro("erro-nome", "Por favor, preencha seu nome.");
                temErro = true;
            } else {
                esconderErro("erro-nome");
            }

            if (email === "") {
                mostrarErro("erro-email", "Por favor, preencha seu e-mail.");
                temErro = true;
            } else if (!validarEmail(email)) {
                mostrarErro("erro-email", "Digite um e-mail válido (ex: usuario@dominio.com).");
                temErro = true;
            } else {
                esconderErro("erro-email");
            }

            if (mensagem === "") {
                mostrarErro("erro-mensagem", "Por favor, escreva uma mensagem.");
                temErro = true;
            } else {
                esconderErro("erro-mensagem");
            }

            if (temErro) {
                return;
            }

            var btnEnviar = formulario.querySelector(".btn-enviar");
            btnEnviar.disabled = true;
            btnEnviar.textContent = "Enviando...";

            // Volta para esta página depois do envio
            document.getElementById("campo-next").value = window.location.href.split("?")[0] + "?enviado=1";
            document.getElementById("campo-replyto").value = email;

            // Envia para ricardopfup@gmail.com via FormSubmit
            formulario.submit();
        });
    }

    // Botão para fechar o modal de sucesso
    var btnFechar = document.getElementById("btn-fechar-modal");
    if (btnFechar) {
        btnFechar.addEventListener("click", function () {
            document.getElementById("modal-sucesso").classList.remove("aberto");
        });
    }
});

// Função que verifica se o e-mail tem formato válido
function validarEmail(email) {
    // Expressão regular simples para validar e-mail
    var padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

// Função para mostrar mensagem de erro embaixo do campo
function mostrarErro(idElemento, texto) {
    var elemento = document.getElementById(idElemento);
    elemento.textContent = texto;
    elemento.style.display = "block";
}

// Função para esconder mensagem de erro
function esconderErro(idElemento) {
    var elemento = document.getElementById(idElemento);
    elemento.style.display = "none";
}
