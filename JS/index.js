const chatExibicao = document.querySelector(".modeloSimples-curriculo");
const chatTexto = document.getElementById("chat-principal-texto");
const formularioPadrao = document.getElementById("formulario-padrao")

// Formulario Experiencia
const formularioExperiencia = document.getElementById("formulario-experiencia");
const botaoAdicionarExperiencia = document.getElementById("chat-principal-button-adicionar");
const botaoAvancarExperiencia = document.getElementById("chat-principal-button-avancar");

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
const experiencias = document.querySelectorAll("#experiencia-profissional p")
// inputs Experiencia
const cargo = document.getElementById("chat-escrita-cargo");
const empresa = document.getElementById("chat-escrita-empresa");
const inicioMes = document.getElementById("chat-escrita-inicio-mes");
const inicioAno = document.getElementById("chat-escrita-inicio-ano");
const fimMes = document.getElementById("chat-escrita-fim-mes");
const fimAno = document.getElementById("chat-escrita-fim-ano")
const descricao = document.getElementById("descricao-currilo")

// Formulario Habiliades
const formularioHabilidades = document.getElementById("formulario-habilidades");

//dados Habilidades
const habilidades = document.querySelectorAll(".habilidades p");
const habilidadesModelo = document.getElementById("habilidades");

//Input Habilidades
const inputHabilidades = document.getElementById("formulario-habilidades-input-envio");

//button Habilidades
const buttonHabilidades = document.getElementById("formulario-habilidades-button");
const buttonAvancarHabilidades = document.getElementById("formulario-habilidades-button-avancar");

// Formulario formacao
const formularioFormacao = document.getElementById("formulario-formacao")

// dados Formacao
const formacao = document.querySelectorAll(".formacao p")
const formacaoModelo = document.getElementById("formacao");

// input formacao
const inputFormacao = document.getElementById("formulario-formacao-input-envio");

// select formacao
const selectEstado = document.getElementById("estado-formacao");



// Variaveis de controle
let experienciasAdicionadas = 0;
let habilidadesAdicionadas = 0
let formacaoAdicionadas = 0

// Configurações do PDF
const opcoes = {
  margin: [0, 0, 0, 0],
  filename: "arquivo.pdf",
  html2canvas: { scale: 3 },
  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
}


// Sem uso mas possivel ideia de implementação para preencher outros Curriculos.
// Se for fazer, vai ter que estilizar pelas classes e identificar os Campos pelo ID.
class Curriculo {
  constructor() {
    this.nomeSobrenome = "";
    this.numTelefone = "";
    this.email = "";
    this.bairro = "";
    this.cidade = "";
    this.estado = "";
    this.cep = "";
    this.experiencia = [];
    this.habilidade = [];
    this.formacao = [];
  }

  getNomeSobrenome() {
    return this.nomeSobrenome
  }

  setNomeSobrenome(novoNomeSobrenome) {
    this.nomeSobrenome = novoNomeSobrenome
  }

  getnumTelefone() {
    return this.numTelefone
  }

  setNumTelefone(novonumTelefone) {
    this.numTelefone = novonumTelefone
  }

  getEmail() {
    return this.email
  }

  setEmail(novoEmail) {
    this.email = novoEmail
  }

  getbairro() {
    return this.bairro
  }

  setBairro(novoBairro) {
    this.bairro = novoBairro
  }

  getCidade() {
    return this.cidade
  }

  setCidade(novaCidade) {
    this.cidade = novaCidade
  }

  getEstado() {
    return this.estado
  }

  setEstado(novoEstado) {
    this.estado = novoEstado
  }

  getCep() {
    return this.cep
  }

  setCep(novoCep) {
    this.cep = novoCep
  }

  addExperiencia(cargo, empresa, descricao, mesInicio, anoInicio, mesFim, anoFim) {
    const novaExperiencia = new Experiencia(cargo, empresa, descricao, mesInicio, anoInicio, mesFim, anoFim);
    this.experiencia.push(novaExperiencia)
  }

  getExperiencia(indice) {
    return this.experiencia[indice]
  }

  removeExperiencia(indice) {
    this.experiencia.splice(indice, 1)
  }

  addHabilidade(habilidade) {
    this.habilidade.push(habilidade);
  }

  getHabilidade(indice) {
    return this.habilidade[indice]
  }

  setHabilidade(indice, habilidade) {
    this.habilidade[indice] = habilidade
  }

  removeHabilidade(indice) {
    this.habilidade.splice(indice, 1)
  }


}

class Experiencia {
  constructor(cargo, empresa, descricao, mesInicio, anoInicio, mesFim, anoFim) {
    this.cargo = cargo;
    this.empresa = empresa;
    this.descricao = descricao
    this.periodo = [mesInicio, anoInicio, mesFim, anoFim];
  }

  getCargo() {
    return this.cargo
  }

  setCargo(cargo) {
    this.cargo = cargo
  }

  getEmpresa() {
    return this.Empresa
  }

  setEmpresa(empresa) {
    this.empresa = empresa
  }

  getDescricao() {
    return this.descricao
  }

  setDescricao(descricao) {
    this.descricao = descricao
  }

  getMesInicio() {
    return this.periodo[0]
  }

  setMesInicio(mesInicio) {
    this.periodo[0] = mesInicio;
  }

  getAnoInicio() {
    return this.periodo[1]
  }

  setAnoInicio(anoInicio) {
    this.periodo[1] = anoInicio
  }

  getMesFim() {
    return this.periodo[2]
  }

  setMesFim(mesFim) {
    this.periodo[2] = mesFim;
  }

  getAnoFim() {
    return this.periodo[3]
  }

  setAnoFim(anoFim) {
    this.periodo[3] = anoFim;
  }
}

class Formacao {
  constructor(formacao, estado) {
    this.formacao = formacao;
    this.estado = estado;
  }
}

const cur = new Curriculo()

// Mapeamento entre etapas do formulário e campos do currículo
const camposCurriculo = [
  "nomeSobrenome",
  "numTelefone",
  "email",
  "bairro",
  "cidade",
  "estado",
  "cep",
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

function adicionarExperiencia(object) {
  object.experiencia.push({
    funcao: cargo.value,
    empresa: empresa.value,
    data_inicio: [inicioMes.value, inicioAno.value],
    data_fim: [fimMes.value, fimAno.value],
    descricao: descricao.value,
  })
}

function adicionarExperienciaModelo(object) {
  // a partir da quantidade já adicionada de experiencias ele adiciona as restantes
  for (experienciasAdicionadas; experienciasAdicionadas < object.experiencia.length; experienciasAdicionadas++) {
    let novaExperiencia = document.createElement("p");
    novaExperiencia.textContent = object.experiencia[experienciasAdicionadas].funcao + " , " + object.experiencia[experienciasAdicionadas].empresa +
      " - ( " + object.experiencia[experienciasAdicionadas].data_inicio[0] + " " + object.experiencia[experienciasAdicionadas].data_inicio[1] + " / " + object.experiencia[experienciasAdicionadas].data_fim[0] + " " +
      object.experiencia[experienciasAdicionadas].data_fim[1] + " )"

    experiencia.appendChild(novaExperiencia);
  }
}

function adicionarHabilidades(object) {
  object.habilidades.push(inputHabilidades.value)
}

function adicionarHabilidadesModelo(object) {
  for (habilidadesAdicionadas; habilidadesAdicionadas < object.habilidades.length; habilidadesAdicionadas++) {
    let novaHabilidade = document.createElement("p");
    novaHabilidade.textContent = object.habilidades[habilidadesAdicionadas]
    console.log("cheguei aqui")
    habilidadesModelo.appendChild(novaHabilidade);
  }
}

function adicionarFormacao(object) {
  object.formacao.push({
    formacao: inputFormacao.value,
    estado: selectEstado.value,
  });
}

function adicionarFormacaoModelo(object) {
  for (formacaoAdicionadas; formacaoAdicionadas < object.formacao.length; formacaoAdicionadas++) {
    let novaFormacao = document.createElement("p");
    novaFormacao.textContent = object.formacao[formacaoAdicionadas].formacao + " - " + object.formacao[formacaoAdicionadas].estado
    formacaoModelo.appendChild(novaFormacao);

  }
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
  "Agora vamos para sua experiencia Profissional, Preencha os Campos",
  "otimo tem mais alguma experiencia para adicionar?",
  "E alguma Habilidade?"
]

// Adiciona a primeira Mensagem
adicionarLiAssistente(mensagens[etapaMensagem]);


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
    let i = 0
    experiencias.forEach(elemento => {
      elemento.textContent = object.experiencia[i].funcao + " , " + object.experiencia[i].empresa +
        " - ( " + object.experiencia[i].data_inicio[0] + " " + object.experiencia[i].data_inicio[1] + " / " + object.experiencia[i].data_fim[0] + " " +
        object.experiencia[i].data_fim[1] + " )"
      i++
    });
  }
  if (object.habilidade.length > 0) {
    let i = 0
    habilidades.forEach(elemento => {
      elemento.textContent = object.habilidade[i]
      i++
    });
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

  novaLi.classList.add("liUsuario")
  novoP.classList.add("pUsuario")

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

function adicionarLiAssistente(texto){
  // Cria um elemento <li>
  const novaLi = document.createElement('li');
  const novoP = document.createElement('p');

  novaLi.classList.add("liAssistente")
  novoP.classList.add("pAssistente")

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

  switch(etapaMensagem){
    case 0:
      cur.setNomeSobrenome(chatTexto.value)
      break
    case 1:
      cur.setNumTelefone(chatTexto.value)
      break
    case 2:
      cur.setEmail(chatTexto.value)
      break
    case 3:
      cur.setBairro(chatTexto.value)
      break
    case 4:
      cur.setCidade(chatTexto.value)
      break
    case 5:
      cur.setEstado(chatTexto.value)
      break
    case 6:
      cur.setCep(chatTexto.value)
      formularioPadrao.style.display = "none";
      formularioExperiencia.style.display = "grid";
      break

  }

  //Atualiza o Curriculo com os dados do objeto
  atualizarCurriculo(cur);

  chatTexto.value = "";
  etapaMensagem += 1;

  //envia texto da assistente
  adicionarLiAssistente(mensagens[etapaMensagem]);


  scrollDown()
})



// Tem que criar a lógica ainda, Formulário de Experiência.
botaoAdicionarExperiencia.addEventListener("click", () => {
  event.preventDefault()

  adicionarExperiencia(cur)
  adicionarExperienciaModelo(cur)
  atualizarCurriculo(cur) // talvez n precise estar aqui

  adicionarLi("funcao: " + cargo.value + " empresa: " + empresa.value + " descricao: " + descricao.value);
  adicionarLiAssistente("Mais Alguma Experiencia?")

  cargo.value = "";
  empresa.value = "";
  descricao.value = "";

  scrollDown()

});

botaoAvancarExperiencia.addEventListener("click", () => {
  adicionarLiAssistente("Vamos para suas Habilidades");
  formularioExperiencia.style.display = "none";
  formularioFormacao.style.display = "flex";

})

formularioHabilidades.addEventListener("submit", () => {
  event.preventDefault()

  // Adiciona o Texto ao chat
  adicionarLi(inputHabilidades.value);

  adicionarHabilidades(cur)
  adicionarHabilidadesModelo(cur)
  atualizarCurriculo(cur) // talvez n precise estar aqui

  adicionarLiAssistente("tem mais alguma habilidade?")

  scrollDown()
})

buttonAvancarHabilidades.addEventListener("click", () => {
  // Adiciona o Texto ao chat
  adicionarLiAssistente("digite uma formacao");
  formularioHabilidades.style.display = "none";
  formularioFormacao.style.display = "none";

})

formularioFormacao.addEventListener("submit", () => {
  event.preventDefault()

  adicionarFormacao(cur)
  adicionarFormacaoModelo(cur)
  adicionarLi(inputFormacao.value + " " + selectEstado.value);
  adicionarLiAssistente("adicione mais uma formacao");

  scrollDown()
})