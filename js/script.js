/* ============================================
   JAVASCRIPT DO PORTFÓLIO
   Trabalho de Fundamentos da Programação Web
   ============================================ */

// DOMContentLoaded = espera a página carregar antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MENU RESPONSIVO (para celular)
    // ==========================================
    var btnMenu = document.getElementById("btn-menu");
    var menuLista = document.getElementById("menu-lista");

    if (btnMenu && menuLista) {
        // Quando clicar no botão ☰ Menu...
        btnMenu.addEventListener("click", function () {
            // ...adiciona ou remove a classe "menu-aberto"
            // O CSS usa essa classe para mostrar/esconder o menu no celular
            menuLista.classList.toggle("menu-aberto");
        });
    }

    // ==========================================
    // TEMA CLARO / ESCURO
    // ==========================================
    var btnTema = document.getElementById("btn-tema");

    if (btnTema) {
        // localStorage guarda a preferência do usuário no navegador
        var temaSalvo = localStorage.getItem("tema");

        // Se já escolheu tema escuro antes, aplica ao carregar a página
        if (temaSalvo === "escuro") {
            document.body.classList.add("tema-escuro");
            btnTema.textContent = "Tema Claro";
        }

        btnTema.addEventListener("click", function () {
            // Alterna a classe "tema-escuro" no body
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

    // ==========================================
    // FORMULÁRIO DE CONTATO
    // ==========================================
    var formulario = document.getElementById("form-contato");

    // Só roda se estiver na página de contato (formulário existe)
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            // Impede o envio automático para validar primeiro
            evento.preventDefault();

            // FormSubmit só funciona pelo site online, não abrindo o arquivo direto
            if (window.location.protocol === "file:") {
                alert("Para enviar, acesse o site online:\nhttps://ricardopfdev.github.io/portfolio/contato.html");
                return;
            }

            // Pega o que o usuário digitou nos campos
            var nome = document.getElementById("nome").value.trim();
            var email = document.getElementById("email").value.trim();
            var mensagem = document.getElementById("mensagem").value.trim();
            var temErro = false;

            // --- Validação: verifica se os campos estão preenchidos ---
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

            // Se encontrou erro, para aqui
            if (temErro) {
                return;
            }

            // Muda o botão para mostrar que está enviando
            var btnEnviar = formulario.querySelector(".btn-enviar");
            btnEnviar.disabled = true;
            btnEnviar.textContent = "Enviando...";

            // FormData junta todos os campos do formulário para enviar
            var dadosForm = new FormData(formulario);
            dadosForm.append("_replyto", email);

            // fetch envia os dados para o FormSubmit (serviço gratuito de e-mail)
            fetch("https://formsubmit.co/ajax/ricardopfup@gmail.com", {
                method: "POST",
                body: dadosForm,
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (dados) {
                if (dados.success === "true" || dados.success === true) {
                    // Deu certo: limpa o formulário e mostra modal de sucesso
                    formulario.reset();
                    document.getElementById("modal-sucesso").classList.add("aberto");
                } else if (dados.message && dados.message.indexOf("Activation") !== -1) {
                    // Primeira vez: precisa ativar pelo e-mail
                    document.getElementById("modal-ativacao").classList.add("aberto");
                } else {
                    alert(dados.message || "Não foi possível enviar. Tente novamente.");
                }
            })
            .catch(function () {
                alert("Erro de conexão. Verifique sua internet e tente novamente.");
            })
            .finally(function () {
                // Volta o botão ao normal, com ou sem erro
                btnEnviar.disabled = false;
                btnEnviar.textContent = "Enviar Mensagem";
            });
        });
    }

    // Fechar modal de sucesso
    var btnFechar = document.getElementById("btn-fechar-modal");
    if (btnFechar) {
        btnFechar.addEventListener("click", function () {
            document.getElementById("modal-sucesso").classList.remove("aberto");
        });
    }

    // Fechar modal de ativação
    var btnFecharAtivacao = document.getElementById("btn-fechar-ativacao");
    if (btnFecharAtivacao) {
        btnFecharAtivacao.addEventListener("click", function () {
            document.getElementById("modal-ativacao").classList.remove("aberto");
        });
    }
});

// Verifica se o e-mail tem formato válido (ex: nome@dominio.com)
function validarEmail(email) {
    var padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

// Mostra mensagem de erro em vermelho embaixo do campo
function mostrarErro(idElemento, texto) {
    var elemento = document.getElementById(idElemento);
    elemento.textContent = texto;
    elemento.style.display = "block";
}

// Esconde a mensagem de erro quando o campo está correto
function esconderErro(idElemento) {
    var elemento = document.getElementById(idElemento);
    elemento.style.display = "none";
}
