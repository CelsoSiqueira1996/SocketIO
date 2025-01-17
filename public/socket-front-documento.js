import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();    

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto);
    });
};    

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
};

socket.on("texto_editor_clientes", (texto) => {
    atualizaTextoEditor(texto);
});

function deletarDocumento(nomeDocumento) {
    socket.emit("deletar_documento", nomeDocumento);
}

socket.on("deletado_sucesso", (nomeDocumento) => {
    alertarERedirecionar(nomeDocumento);
})

export { emitirTextoEditor, selecionarDocumento, deletarDocumento };