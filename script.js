const celulas = document.querySelectorAll(".celula"); // Para acessar a celula, usei const pq as celulas não se alteram
let checarTurno = true ; // Variável para verificar a vez de qual jogador, Usei let pq essa váriavel altera entre true e false
const JOGADOR_X = "X"; // Definindo o primeiro jogador X
const JOGADOR_O = "O"; // Defininfo o segundo jogador com O
const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")) { //Para dizer que o evento clik só vale se for dentro de uma celula
        jogar(event.target.id);
    }
})

function jogar (id) {
const celula = document.getElementById(id);
turno = checarTurno ? JOGADOR_X : JOGADOR_O; // Definindo a vez de cada jogador e atribuindo X ou O para cada jogador
celula.textContent = turno; 
celula.classList.add(turno);

checarVencedor(turno); // Aqui checa se já existe um vencedor, e se o jogo continua ou termina.
}

// Até aqui o jogo esta funcionando, colocando o X e O de modo alternado, e agora vamos fazer uma função para verificar se já existe um vencedor.

// Para verificar se existe vencedor, em cada jogada ele deverá percorrer cada array para ver se aquele jogador comtemplou alguma das combinações do array. O .some significa que se ALGUM dos arrays retornar true a função toda retorna true. O .every é o contrário do some, para a função retornar true, TODOS os array tem que ser true

function checarVencedor(turno) {
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => { 
            return celulas[index].classList.contains(turno);
        })
    });

    if (vencedor) {
        encerrarJogo(turno);
        } else if (checarEmpate()) {
            encerrarJogo();
            } else {
            checarTurno = !checarTurno; // O contrario de checarTurno, que é declarado true na let. Alterando a vez do jogador, se for true fica false, se for false fica true.
        }
    }

    function checarEmpate() {
        let x = 0;
        let o = 0;

        for (index in celulas) {
            if(!isNaN(index)) {
                if(celulas[index].classList.contains(JOGADOR_X)) {
                    x++;
                }
                if(celulas[index].classList.contains(JOGADOR_O)) {
                    o++;
                }
            }
        }
        return x + o === 9 ? true : false;
    }

    function encerrarJogo(vencedor = null) {
        const telaEscura = document.getElementById("tela-escura"); 
        const h2 = document.createElement("h2"); /* Criando o h2, que é uma váriavel, que será a frase Venceu ou Empatou */
        const h3 = document.createElement("h3"); /* Criando o h3 */
        let mensagem = null;

        telaEscura.style.display = "block";
        telaEscura.appendChild(h2); /* Esta colocando a variavel h2, dentro da div tela-escura */
        telaEscura.appendChild(h3);
        
        if (vencedor) {
            h2.innerHTML = `O player <span>${vencedor}<span> venceu`;
            } else {
                h2.innerHTML = "Empatou";
        }
    }

