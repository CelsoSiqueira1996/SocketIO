import DocumentoService from "../services/DocumentoService.js";

const documentoService = new DocumentoService();

class FuncoesDocumentos {
    static async encontrarDocumento(nome) {
        const documento = await documentoService.getRegistroByName(nome);
        return documento;
    }

    static async atualizarDocumento(nomeDocumento, texto) {
        await documentoService.updateRegistro(nomeDocumento, { texto });
    }

    static async pegaTodosDocumentos() {
        const documentos = await documentoService.getRegistros();
        return documentos;
    }

    static async criarNovoDocumento(nomeDocumento) {
        const novoRegistro = await documentoService.createRegistro({ nome: nomeDocumento });
        return novoRegistro;
    }

    static async deletarDocumento(nomeDocumento) {
        await documentoService.deleteRegistro(nomeDocumento);
    }
}

export default FuncoesDocumentos;