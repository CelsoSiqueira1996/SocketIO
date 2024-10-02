import { carregarDocumentos, inserirNovoDocumento, removerDocumento } from "./index.js";

const socket = io();

function carregarDocumentosDoServidor() {
    socket.emit("carregar_documentos", (documentos) => {
        carregarDocumentos(documentos);
    })
};

function emitirDocumento(nomeDocumento) {
    socket.emit("emitir_novo_documento", nomeDocumento);
};

socket.on("deletado_sucesso", (documentos) => {
    removerDocumento(documentos);
});

socket.on("emitir_novo_documento_cliente", (documento) => {
    inserirNovoDocumento(documento);
});

socket.on("documento_existe", (nomeDocumento) => {
    alert(`Documento ${nomeDocumento} já existe!`);
})

export { carregarDocumentosDoServidor, emitirDocumento };