import { deletarDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
console.log(nomeDocumento)

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const btnExcluirDocumento = document.getElementById("excluir-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor({
        texto: textoEditor.value,
        nomeDocumento
    });
});

btnExcluirDocumento.addEventListener("click", () => {
    deletarDocumento(nomeDocumento);
})

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
}

function alertarERedirecionar(nome) {
    if(nome === nomeDocumento) {
        alert(`Documento ${nome} excluído com sucesso!`);
        window.location.href = "/";
    }
}

export { atualizaTextoEditor, alertarERedirecionar };
