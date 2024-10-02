import mongoose from "mongoose";

const documentoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { 
        type: String,
        requerid: [true, "O nome do documento é obrigatório!"],
        validate: {
            validator: (value) => value.trim() !== "",
            message: ({path}) => `O campo ${path} foi fornecido em branco.`
        }
    },
    texto: { type: String }
}, { versionKey: false });

const documentoModel = mongoose.model("documentos", documentoSchema);

export default documentoModel;