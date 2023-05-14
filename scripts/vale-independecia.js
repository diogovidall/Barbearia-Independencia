
const validarBtn = document.getElementById("validar");
const bloco1 = document.getElementById("block1");
const bloco2 = document.getElementById("block2");
const bloco3 = document.getElementById("block3");
const bloco4 = document.getElementById("block4");
const bloco5 = document.getElementById("block5");
const bloco6 = document.getElementById("block6");
const bloco7 = document.getElementById("block7");
const bloco8 = document.getElementById("block8");
const bloco9 = document.getElementById("block9");

const blocos = [bloco1, bloco2, bloco3, bloco4, bloco5, bloco6, bloco7, bloco8, bloco9];
var numeroDoBloco = 0;

validarBtn.addEventListener("click", function validar() {
    const nome = document.getElementById("input-nome-completo").value;
    const barbeiro = document.getElementById("input-nome-barbeiro").value;
    const data = document.getElementById("diaRealizado").value;



    // declarando um contador fora da função validar() conseguimos controlar qual bloco deve ser preenchido e incrementar o contador a cada vez que o botão for clicado.
    // Como são nove blocos, NumeroDoBlocos são justamente esses blocos.

    if (nome !== "" && barbeiro !== "" && data !== "") {
        if (numeroDoBloco < blocos.length) {
            blocos[numeroDoBloco].classList.add("anotado");
            blocos[numeroDoBloco].style.backgroundColor = "#9a9a9a";
            numeroDoBloco++;
        } else {
            mensagem_resultado.innerHTML = `Obrigado ${nome} por fazer parte de nossa Barbearia. Você completou nosso Vale Independência, e para agradecer oferecemos um serviço gratuito para você aproveitá-lo quando preferir.`;
            alert("Você Completou o Vale Independência!!!")
        }
    }
    else {
        alert("Não foi possível achar no sistema seu cadastro!");
    }
});

