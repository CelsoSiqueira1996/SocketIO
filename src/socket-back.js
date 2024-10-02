import io from "./servidor.js";
import FuncoesDocumentos from "./funcoesSocketIO/FuncoesDocumentos.js";

io.on("connection", (socket) => {
    socket.on("carregar_documentos", async (carregarDocumentos) => {
        const documentos = await FuncoesDocumentos.pegaTodosDocumentos();
        carregarDocumentos(documentos);
    });

    socket.on("emitir_novo_documento", async (nomeDocumento) => {
        const documentoExiste = !!(await FuncoesDocumentos.encontrarDocumento(nomeDocumento));
        if(documentoExiste) {
            socket.emit("documento_existe", nomeDocumento);
        } else {
            const novoRegistro = await FuncoesDocumentos.criarNovoDocumento(nomeDocumento);
            io.emit("emitir_novo_documento_cliente", novoRegistro)
        }
    });

    socket.on("deletar_documento", async (nomeDocumento) => {
        await FuncoesDocumentos.deletarDocumento(nomeDocumento);
        const documentos = await FuncoesDocumentos.pegaTodosDocumentos(); 
        io.emit("deletado_sucesso", nomeDocumento);
    })

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);
        const documento = await FuncoesDocumentos.encontrarDocumento(nomeDocumento);

        if (documento) {
            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        await FuncoesDocumentos.atualizarDocumento(nomeDocumento, texto);
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    });
});
