const chatExibicao = document.querySelector(".modeloSimples-curriculo");
const chatTexto = document.getElementById("chat-principal-texto");
const formularioPadrao = document.getElementById("formulario-padrao")
const formularioExperiencia = document.getElementById("formulario-experiencia");

// dados Base.
const nomeSobrenome = document.getElementById("nome-sobrenome");
const numTelefone = document.getElementById("numero-telefone");
const email = document.getElementById("email");

// dados do endereço
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const cep = document.getElementById("cep");


// Configurações do PDF
const opcoes = {
  margin: [0, 0, 0, 0],
  filename: "arquivo.pdf",
  html2canvas: { scale: 3 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
}


// Sem uso mas possivel ideia de implementação para preencher outros Curriculos.
// Se for fazer, vai ter que estilizar pelas classes e identificar os Campos pelo ID.
var curriculo = {
  nomeSobrenome: "",
  numTelefone: 0,
  email: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",

}
console.log(curriculo.nomeSobrenome);

function scrollDown() {
  var container = document.querySelector(".chat-principal-exibicao");
  container.scrollTop = container.scrollHeight;
}


// etapas do curriculo para alteralo pelo seu ID
let etapaCurriculo = [nomeSobrenome, numTelefone, email, bairro, cidade, estado, cep]

// etapa mensagem percorre as perguntas e o id das respostas ao mesmo tempo
let etapaMensagem = 0;

// lista de mensagens
let mensagens = [
  "Digite Seu nome Completo",
  "Qual seu  Número de Telefone?, por exemplo 27 99999-9999",
  "Qual seu endereço de email?",
  "Digite o Seu Bairro",
  "Digite Sua Cidade",
  "Digite Seu Estado",
  "Digite Seu Cep",
  "Agora vamos para sua experiencia Profissional, Preencha os Campos"
]

// Adiciona a primeira Mensagem
adicionarLi(mensagens[etapaMensagem]);

function adicionaTexto(texto, elemento) {
  const mensagem = document.createTextNode(texto);
  elemento.appendChild(mensagem);
}


// a resposta do usuário e a tag que vai querer criar, por exemplo "p"
function criarElementoCurriculo(resposta, tag, elemento) {
  const novoElemento = document.createElement(tag);

  // Adiciona a resposta ao elemento
  adicionaTexto(resposta, novoElemento);

  // Adciona o elemento ao Curriculo
  elemento.appendChild(novoElemento);

}

function adicionarLi(texto) {
  // Cria um elemento <li>
  const novaLi = document.createElement('li');
  const novoP = document.createElement('p');

  // Adiciona texto ao <p>
  const textoLi = document.createTextNode(texto);
  novoP.appendChild(textoLi);

  // Adiciona o <p> ao <li>
  novaLi.appendChild(novoP);

  // Obtém a lista ordenada
  const lista = document.querySelector('.chat-principal-conversa');

  // Insere o <li> na lista ordenada
  lista.appendChild(novaLi);
}


// Funcionamento do Formulário Padrão.
formularioPadrao.addEventListener("submit", () => {
  event.preventDefault()



  // Lógica do Chat.

  // Adiciona o Texto ao chat
  adicionarLi(chatTexto.value);

  //Adiciona o Texto ao curriculo
  adicionaTexto(chatTexto.value, etapaCurriculo[etapaMensagem])

  chatTexto.value = "";
  etapaMensagem += 1;

  //envia texto da assistente
  adicionarLi(mensagens[etapaMensagem]);

  // Troca o Forms Para o de Experiencias Profissionais
  if (etapaMensagem == 7) {
    formularioPadrao.style.display = "none";
    formularioExperiencia.style.display = "flex";
  }


  scrollDown()

})


// Tem que criar a lógica ainda, Formulário de Experiência.
formularioExperiencia.addEventListener("submit", () => {
  event.preventDefault()

  const experiencia = document.getElementById("experiencia-profissional")

  scrollDown()

});

