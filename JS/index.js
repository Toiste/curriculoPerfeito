const botaoEnvio = document.querySelector("#chat-principal-button");

botaoEnvio.addEventListener("click", () => {
  console.log("teste");
  const chatExibicao = document.querySelector(".chat-principal-exibicao");

  const opcoes = {
    margin: [10, 10, 10, 10],
    filename: "arquivo.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  }

  // Gerar e baixar o PDF
  html2pdf().set(opcoes).from(chatExibicao).save();
})