const chatExibicao = document.querySelector(".modeloSimples-curriculo");
const chatTexto = document.getElementById("chat-principal-texto");
const formularioPadrao = document.getElementById("formulario-padrao")

// Formulario Experiencia
const formularioExperiencia = document.getElementById("formulario-experiencia");
const botaoAdicionarExperiencia = document.getElementById("chat-principal-button-adicionar");

// dados Base.
const nomeSobrenome = document.getElementById("nome-sobrenome");
const numTelefone = document.getElementById("numero-telefone");
const email = document.getElementById("email");

// dados do endereço
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const cep = document.getElementById("cep");

// dados Experiencia
const experiencia = document.getElementById("experiencia-profissional");
// inputs Experiencia
const cargo = document.getElementById("chat-escrita-cargo");
const empresa = document.getElementById("chat-escrita-empresa");
const inicioMes = document.getElementById("chat-escrita-inicio-mes");
const inicioAno = document.getElementById("chat-escrita-inicio-ano");
const fimMes = document.getElementById("chat-escrita-fim-mes");
const fimAno = document.getElementById("chat-escrita-fim-ano")
const descricao = document.getElementById("descricao-currilo")

// Configurações do PDF
const opcoes = {
  margin: [0, 0, 0, 0],
  filename: "arquivo.pdf",
  html2canvas: { scale: 3 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
}


// Sem uso mas possivel ideia de implementação para preencher outros Curriculos.
// Se for fazer, vai ter que estilizar pelas classes e identificar os Campos pelo ID.
let curriculo = {
  nomeSobrenome: "oi",
  numTelefone: "",
  email: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  experiencia: [],

}

// Mapeamento entre etapas do formulário e campos do currículo
const camposCurriculo = [
  "nomeSobrenome",
  "numTelefone",
  "email",
  "bairro",
  "cidade",
  "estado",
  "cep"
];

// Obter o ano atual
let anoAtual = new Date().getFullYear();

// Definir um limite de idade (opcional)
let limiteIdade = 120; // por exemplo, limite de 120 anos

// Loop para adicionar anos à lista suspensa
for (let ano = anoAtual; ano >= anoAtual - limiteIdade; ano--) {
  var option = document.createElement("option");
  option.text = ano;
  option.value = ano;
  inicioAno.add(option);
}

// Definir um limite de idade (opcional)
limiteIdade = 120; // por exemplo, limite de 120 anos

// Loop para adicionar anos à lista suspensa
for (let ano = anoAtual; ano >= anoAtual - limiteIdade; ano--) {
  let option = document.createElement("option");
  option.text = ano;
  option.value = ano;
  fimAno.add(option);
}

function adicionarExperiencia() {
  curriculo.experiencia.push({
    funcao: cargo.value,
    empresa: empresa.value,
    data_inicio: [inicioMes.value, inicioAno.value],
    data_fim: [fimMes.value, fimAno.value],
    descricao: descricao.value,
  })
  console.log(curriculo.experiencia[0])
}

function scrollDown() {
  var container = document.querySelector(".chat-principal-exibicao");
  container.scrollTop = container.scrollHeight;
}

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


// Modelo Curriculo
function atualizarCurriculo(object) {

  nomeSobrenome.textContent = object.nomeSobrenome;
  numTelefone.textContent = object.numTelefone;
  email.textContent = object.email;
  bairro.textContent = object.bairro;
  cidade.textContent = object.cidade;
  estado.textContent = object.estado;
  cep.textContent = object.cep;

  if (object.experiencia.length > 0) {


    //ele só está criando e não atualiziando os dados, A solução é criar um variavel que conta quantos criados existem, ai você atualiza os criados
    // e cria os que faltam
    for (let i = 0; i < object.experiencia.length; i++) {
      let novaExperiencia = document.createElement("p");
      novaExperiencia.textContent = object.experiencia[i].funcao + " , " + object.experiencia[i].empresa +
        " - ( " + object.experiencia[i].data_inicio[0] + " " + object.experiencia[i].data_inicio[1] + " / " + object.experiencia[i].data_fim[0] + " " +
        object.experiencia[i].data_fim[1] + " )"

      experiencia.appendChild(novaExperiencia);
    }

  }

}


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

  // adiciona o Texto ao objeto curriculo
  curriculo[camposCurriculo[etapaMensagem]] = chatTexto.value;

  //Atualiza o Curriculo com os dados do objeto
  atualizarCurriculo(curriculo);

  chatTexto.value = "";
  etapaMensagem += 1;

  //envia texto da assistente
  adicionarLi(mensagens[etapaMensagem]);

  // Troca o Forms Para o de Experiencias Profissionais
  if (etapaMensagem == 7) {
    formularioPadrao.style.display = "none";
    formularioExperiencia.style.display = "grid";
  }

  scrollDown()
})



// Tem que criar a lógica ainda, Formulário de Experiência.
botaoAdicionarExperiencia.addEventListener("click", () => {
  event.preventDefault()

  adicionarExperiencia()
  atualizarCurriculo(curriculo)

  scrollDown()

});

