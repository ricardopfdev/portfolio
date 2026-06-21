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

    // --- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    var formulario = document.getElementById("form-contato");

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            // Impede o envio padrão para validar os campos antes
            evento.preventDefault();

            // Pega os valores dos campos
            var nome = document.getElementById("nome").value.trim();
            var email = document.getElementById("email").value.trim();
            var mensagem = document.getElementById("mensagem").value.trim();

            // Variável para saber se tem erro
            var temErro = false;

            // Valida o campo nome
            if (nome === "") {
                mostrarErro("erro-nome", "Por favor, preencha seu nome.");
                temErro = true;
            } else {
                esconderErro("erro-nome");
            }

            // Valida o campo e-mail
            if (email === "") {
                mostrarErro("erro-email", "Por favor, preencha seu e-mail.");
                temErro = true;
            } else if (!validarEmail(email)) {
                mostrarErro("erro-email", "Digite um e-mail válido (ex: usuario@dominio.com).");
                temErro = true;
            } else {
                esconderErro("erro-email");
            }

            // Valida o campo mensagem
            if (mensagem === "") {
                mostrarErro("erro-mensagem", "Por favor, escreva uma mensagem.");
                temErro = true;
            } else {
                esconderErro("erro-mensagem");
            }

            // Se não teve erro, envia a mensagem para o e-mail
            if (!temErro) {
                var btnEnviar = formulario.querySelector(".btn-enviar");
                btnEnviar.disabled = true;
                btnEnviar.textContent = "Enviando...";

                // Envia os dados para o FormSubmit (serviço que encaminha para o Gmail)
                fetch("https://formsubmit.co/ajax/ricaropfup@gmail.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        mensagem: mensagem,
                        _subject: "Nova mensagem do portfólio",
                        _template: "table",
                        _replyto: email
                    })
                })
                .then(function (resposta) {
                    return resposta.json();
                })
                .then(function (dados) {
                    if (dados.success === "true" || dados.success === true) {
                        // Limpa os campos do formulário
                        formulario.reset();

                        // Mostra a mensagem de sucesso
                        document.getElementById("modal-sucesso").classList.add("aberto");
                    } else {
                        alert("Não foi possível enviar. Tente novamente mais tarde.");
                    }
                })
                .catch(function () {
                    alert("Erro ao enviar a mensagem. Verifique sua conexão e tente novamente.");
                })
                .finally(function () {
                    btnEnviar.disabled = false;
                    btnEnviar.textContent = "Enviar Mensagem";
                });
            }
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
