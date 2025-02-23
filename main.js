import dataQuiz from "./assets/data.js";

let nivelAtual = 1; // Inicializa o nível atual
let perguntasRespondidas = 0; // Inicializa o contador de perguntas respondidas
let indexPerguntaAtual = 0; // Inicializa o índice da pergunta atual
let respostasCorretas = 0; // Inicializa o contador de respostas corretas

const dataInfo = [
    { posicao: 'Líder', nome: "Amadeu Fernandes da Silva Neto" },
    { posicao: 'Comunicador', nome: "Kozikla Sanara Criri Rodrigues" },
    { posicao: 'Gestor/a do conhecimento', nome: "Stéphanie Maria Câmdido dos Santos" },
    { posicao: 'Colaborador/a', nome: "Antonio Sérgio Viana dos Santos" },
    { posicao: 'Colaborador/a', nome: "Caio da Silva Sousa" },
    { posicao: 'Colaborador/a', nome: "Sabrina Alves Marques" }
];

const initQuiz = () => {
    let username = prompt("Como deseja ser chamado?");
    document.getElementById('user').innerHTML += username;
    let x = 0;
    while (x < dataInfo.length) {
        document.getElementById('iteg').innerHTML += `<p>${dataInfo[x].posicao}: <span>${dataInfo[x].nome}</span></p>`;
        x++;
    }
};
initQuiz();


function exibirMensagemNivel() {
    let totalPerguntas = dataQuiz.length;
    let scoreNivel = document.getElementById('scoreNivel');
    let container_team = document.getElementById('container_team');
    let progressoAtual = (perguntasRespondidas / totalPerguntas) * 100;

    if (progressoAtual < 20) {
        scoreNivel.innerHTML = `<span>Nível Atual: Fácil</span>`;
        container_team.style.borderColor = "green";
    } else if (progressoAtual >= 40 && progressoAtual < 60) {
        scoreNivel.innerHTML = `<span>Nível Atual: Médio</span>`;
        container_team.style.borderColor = "gold";
    } else if (progressoAtual >= 80) {
        scoreNivel.innerHTML = `<span>Nível Atual: Díficil</span>`;
        container_team.style.borderColor = "red";
    }
};

function exibirPergunta() {
    let containerQuiz = document.getElementById('quiz');
    let perguntaAtual = dataQuiz[indexPerguntaAtual];

    containerQuiz.innerHTML = `<h2>${perguntaAtual.question}</h2>`;

    for (let i = 0; i < perguntaAtual.alternatives.length; i++) {
        containerQuiz.innerHTML += `<button class="alternatives" data-index="${i}">${perguntaAtual.alternatives[i]}</button>`;
    }

    // Adiciona evento de clique nas alternativas
    document.querySelectorAll('.alternatives').forEach(function (alternativa) {
        alternativa.onclick = function () {
            verificarResposta(parseInt(alternativa.getAttribute('data-index')));
        };
    });

};

function verificarResposta(respostaUsuario) {
    let perguntaAtual = dataQuiz[indexPerguntaAtual];
    if (respostaUsuario === perguntaAtual.index_correct_question) {
        respostasCorretas++;
        perguntasRespondidas++;
        if (respostasCorretas % 2 === 0) {
            nivelAtual++;
            exibirMensagemNivel();
        }
        if (indexPerguntaAtual < dataQuiz.length - 1) {
            indexPerguntaAtual++;
            exibirPergunta();
        } if (respostasCorretas === 5) {
            let containerRestart = document.getElementById('reiniciar');
            // Criando o botão de reiniciar quando o quiz acaba
            let restartButton = document.createElement('button');
            restartButton.textContent = "Reiniciar";
            restartButton.id = "restart";

            containerRestart.appendChild(restartButton);
            restartButton.onclick = function () {
                initQuiz();
            };
        }


    } else {
        alert('Resposta incorreta. Recomece o quiz.');
        nivelAtual = 0;
        perguntasRespondidas = 0;
        indexPerguntaAtual = 0;
        respostasCorretas = 0;
        exibirMensagemNivel();
        exibirPergunta();
    }
};

document.getElementById('start').onclick = function () {
    // Inicia o quiz quando o botão de início for clicado
    exibirMensagemNivel();
    exibirPergunta();
    document.getElementById('start').style.display = 'none'; // Oculta o botão de início
    document.getElementById('text').style.display = 'none'; // Oculta o texto
};