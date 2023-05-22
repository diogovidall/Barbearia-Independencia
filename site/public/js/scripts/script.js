//Login e cadastro
var divImage = document.getElementById("image-area");


function moveImageRigth() {
    divImage.style.width = '100%';
    setTimeout(function () {
        divImage.classList.add("right-value");
        divImage.classList.remove("left-value");
        divImage.style.width = '50%';
    }, 800);
}

function moveImageLeft() {
    divImage.style.width = '100%';
    setTimeout(function () {
        divImage.classList.add("left-value");
        divImage.classList.remove("right-value");
        divImage.style.width = '50%';
    }, 800);
}

// Carousel
var count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    nextImage();
}, 6000)

function nextImage() {
    count++;
    if(count>4){
        count = 1;
    }

    document.getElementById("radio" + count).checked = true;
}

//Carousel serviços
const imgs = document.getElementById("img");
const img = document.querySelectorAll("#img img");

let idx = 0;

function carrosel() {
    idx++;

    if(idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 550}px)`;
    imgs.style.transition = `.9s ease-in-out`;
}
setInterval(carrosel, 4000);

//Web data Viz
function cadastrar() {
    var nomeVar = nome_input.value;
    var cpfVar = cpf_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (nomeVar == "" ||cpfVar == ""|| emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        alert("Preencha todos os campos corretamente.");
        return false;
    } else if(senhaVar !== confirmacaoSenhaVar){
alert("Erro ao encontrar sua senha. Verifique se digitou ela corretamente.");
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            cpfServer: cpfVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok && senhaVar == confirmacaoSenhaVar) {
           alert("Cadastro realizado com sucesso!");
            limparFormulario();
        } else {
            throw new Error("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

// login
function telaLogin() {
    var botaoLogin = document.querySelector('#telaLogin').value;
    window.location.href = "./cadastro.html";
}

function entrar() {
     var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Verifique se todos os campos foram digitados corretamente.");
        return false;
    }
    else {
        alert("Entrando na página inicial")
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./index.html";
                }, 1000); 

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
