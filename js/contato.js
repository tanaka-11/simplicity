/* Selecionando os elementos a serem manipulados */
const formulario = document.querySelector("form");
const campoTelefone = document.querySelector("#telefone");
const campoCep = document.querySelector("#cep");
const campoEndereco = document.querySelector("#endereco");
const campoBairro = document.querySelector("#bairro");
const campoCidade = document.querySelector("#cidade");
const campoEstado = document.querySelector("#estado");
const botaoLocalizar = document.querySelector("#localizar-cep");
const mensagemStatus = document.querySelector("#status");

/* Ajax: técnica de comunicação assincrona geralmente usada em API's (utilizamos para localizar o CEP)*/

// Ativando as mascaras atraves do jQuery e jQuery.mask
$(campoCep).mask("00000-000");
$(campoTelefone).mask("(00) 0000-00000");

// Configurando o botão p/ localização de CEP
botaoLocalizar.addEventListener("click", async function(event){
    event.preventDefault();


    // Pegar o cep digitado no campo
    let cep = campoCep.value;

    // Preparar uma url dinâmica (com variável e o resto da url)
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Acessando a API ViaCEP e obtendo dados do cep informado*/
    //Etapa 1: Acessar o ViaCEP via URL 

    // Processo assincrono: sem uma ordem obrigatoria = *async* antes da *function*
    // Processo sincrono: ordem obrigatoria 
    const resposta = await fetch(url);

    //Etapa 2: Pegar/Extrair os dados da resposta como um objeto JSON
    const dados = await resposta.json();


    //Etapa3: Mostrar os dados
    if ("erro" in dados){
        mensagemStatus.textContent = "CEP não encontrado";
        mensagemStatus.style.color = "red";
    } else {
        mensagemStatus.textContent = "CEP encontrado";
        mensagemStatus.style.color = "blue";

        // Colocando cada parte dos dados nos campos
        campoEndereco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;
    }
});


/* Programação do Formspree utilizando AJAX (retirado do proprio Formspree!)*/
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado pelo seu envio!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Houve um erro em seu envio!"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Houve um erro em seu envio!"
      });
    }
    form.addEventListener("submit", handleSubmit)