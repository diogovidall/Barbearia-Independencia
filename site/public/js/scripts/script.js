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

setInterval(function () {
    nextImage();
}, 4000)

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true;
}

//Web data Viz
function cadastrar() {
    var nomeVar = nome_input.value;
    var cpfVar = cpf_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (nomeVar == "" || cpfVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Erro ao fazer o cadastro',
            background: '#181818',
            color: 'white',
            text: 'Preencha todos os campos corretamente.',
        });
        return false;
    } else if (senhaVar != confirmacaoSenhaVar) {
        Swal.fire({
            icon: 'error',
            title: 'Erro ao fazer o login',
            background: '#181818',
            color: 'white',
            text: 'As duas senhas não se coincidem!',
        });
        return false;
    } else if (cpfVar.length < 11 || cpfVar.length > 11) {
        Swal.fire({
            icon: 'error',
            title: 'O CPF precisa ter 11 caracteres',
            background: '#181818',
            color: 'white',
            text: 'Preencha todos os campos corretamente.',
        });
        return false;
    } else if (isNaN(cpfVar)) {
        Swal.fire({
            icon: 'error',
            title: 'O CPF não pode possuir letras',
            background: '#181818',
            color: 'white',
            text: 'Preencha todos os campos corretamente.',
        });
        return false;

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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });
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

function entrar() {
    var emailVar = email_input_login.value;
    var senhaVar = senha_input_login.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Erro ao fazer o login?',
            background: '#181818',
            color: 'white',
            text: 'Preencha todos os campos corretamente.',
        });
        return false;
    } else {
        let timerInterval
        Swal.fire({
            title: 'Entrando em sua conta, por favor aguarde...',
            html: 'Mensagem fechando em <b></b> segundos.',
            timer: 1000,
            background: '#181818',
            color: 'white',
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        });
               
        setTimeout(function () {
            window.open("https://booksy.com/pt-br/174888_barbearia-independencia-sp_barbearias_1047773_sao-paulo", "_blank");
        }, 2000);
        console.log("Estou no Timeout do Booksy ");
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

                //Realizando os redirecionamentos
                setTimeout(function () {
                    window.location = "../index.html";
                }, 2000);
                console.log("Estou do Timeout do Index");

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");
            resposta.text().then(texto => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao fazer o login',
                    background: '#181818',
                    color: 'white',
                    text: texto,
                });

                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
