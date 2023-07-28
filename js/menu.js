const botao = document.querySelector("nav h2");
const linksMenu = document.querySelector(".menu");
const icone = document.querySelector(".icone");

botao.addEventListener("click", function (event){
    event.preventDefault();
    linksMenu.classList.toggle("aberto");
    
    /* Lógica para alternância de texto/icone:
    Se a classe "aberto" estiver aplicada no linksMenu, deve mudar o texto para "Fechar". 
    Senão, continue mostrando o texto/icone "Menu".*/
    if (linksMenu.classList.contains("aberto")) { 
        icone.innerHTML = "Fechar &times;";
    } else {
        icone.innerHTML = "Menu &equiv;";
    }
});





