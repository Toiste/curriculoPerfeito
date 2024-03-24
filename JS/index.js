// Lógica do download do PDF

const envioTexto = document.querySelector(".chat-escrita");
let etapaMensagem = 1;
let mensagem = '';

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


envioTexto.addEventListener("submit", () => {
  event.preventDefault()

  const chatExibicao = document.querySelector(".modeloSimples-curriculo");
  const chatTexto = document.getElementById("chat-principal-texto");

  // Adiciona um novo balão de texto
  adicionarLi(chatTexto.value);

  chatTexto.value = '';

  // Configurações do PDF
  const opcoes = {
    margin: [0, 0, 0, 0],
    filename: "arquivo.pdf",
    html2canvas: { scale: 3 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }

  // Gerar e baixar o PDF
  //html2pdf().set(opcoes).from(chatExibicao).save();

  // Lógica do Chat.

  switch (etapaMensagem) {

    case 1: mensagem = "Qual Sua Idade?, Digite Apenas o Número Namoral";
      break;

    case 2: mensagem = "Qual seu  Phone Number?, por exemplo 27 99999-9999 ";
      break;

    case 3: mensagem = "Onde tu mora?, Digita teu Estado, exemplo Espirito Santo";
      break;

    default:
      mensagem = "é isso por enquanto seu cracudo";
      break;

  }
  etapaMensagem += 1;

  adicionarLi(mensagem);


})

