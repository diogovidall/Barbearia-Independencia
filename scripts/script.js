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




//Login
function login() {
    var emailLogin = document.querySelector('#input-email-login').value;
    var senhaLogin = document.querySelector('#input-senha-login').value;

    if (senhaLogin == "123" && emailLogin == "exemplo@sptech.com") {
        window.location.href = "./index.html";
    } else {
        alert("Veja se digitou a senha corretamente")
    }
}

function telaLogin() {
    var botaoLogin = document.querySelector('#telaLogin').value;
    window.location.href = "./cadastro.html";
}

