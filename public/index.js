import { carregarDocumentosDoServidor, emitirDocumento } from "./socket-front-index.js";

const documentosDiv = document.getElementById("lista-documentos");
const formulario = document.getElementById("form-adiciona-documento");

carregarDocumentosDoServidor();

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const campoNomeDocumento = document.getElementById("input-documento");
    emitirDocumento(campoNomeDocumento.value);
    campoNomeDocumento.value = "";
});

function carregarDocumentos(documentos) {
    documentosDiv.innerHTML = "";
    documentos.forEach((documento) => {
        inserirNovoDocumento(documento);
    })
};

function inserirNovoDocumento(documento) {
    documentosDiv.innerHTML += `
    <a href="documento.html?nome=${documento.nome}" class="list-group-item list-group-item-action"
    id="${documento.nome}">
    ${documento.nome}
    </a>
`
}

function removerDocumento(nomeDocumento) {
    const documento = document.getElementById(nomeDocumento);
    documentosDiv.removeChild(documento);
}

export { carregarDocumentos, inserirNovoDocumento, removerDocumento };