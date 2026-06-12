const btn = document.getElementById("btnIniciar");

const bloco1 = document.querySelector(".bloco1");
const bloco2 = document.querySelector(".bloco2");
const bloco3 = document.querySelector(".bloco3");

const resultado = document.getElementById("resultado");

let nomes = [];

async function carregarNomes()
{
    for(let i = 1; i <= 3; i++)
    {
        const resposta =
            await fetch("https://randomuser.me/api/");

        const dados =
            await resposta.json();

        const nome =
            dados.results[0].name.first;

        nomes.push(nome);

        document.getElementById(
            `nome${i}`
        ).textContent = nome;
    }
}

carregarNomes();

btn.addEventListener("click", iniciarCorrida);

let vencedorEncontrado = false;

function iniciarCorrida()
{
    vencedorEncontrado = false;
    resultado.textContent = "";

    mover(bloco1, nomes[0]);
    mover(bloco2, nomes[1]);
    mover(bloco3, nomes[2]);
    
}

function mover(bloco, nome)
{
    let posicao = 0;

    const velocidade =
        Math.random() * 15 + 5;

    const corrida =
        setInterval(() =>
        {
            posicao += velocidade;

            bloco.style.left =
                posicao + "px";

            if(posicao >= 700)
            {
                clearInterval(corrida);

                if(!vencedorEncontrado)
                {
                    vencedorEncontrado = true;

                    resultado.textContent =
                        `Vencedor: ${nome}`;

                    salvarResultado(nome);
                    
                }
            }

        },100);
}

async function salvarResultado(vencedor)
{
    await fetch(
        "http://localhost:3000/corrida",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                vencedor:vencedor
            })
        }
    );
}