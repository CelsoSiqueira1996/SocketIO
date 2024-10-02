import { models } from "../models/index.js";

class Services {
    constructor(nomeModelo) {
        this.modelo = nomeModelo;
    }

    async getRegistros() {
        try {
            const registros = await models[this.modelo].find();
            return registros;
        } catch (error) {
            throw error;
        }
    }

    async getRegistroByName(nome) {
        try {
            const registro =  await models[this.modelo].findOne({
                nome: nome
            });

            return registro;
        } catch (error) {
            throw error;
        }
    }

    async createRegistro(dto) {
        try {
            const registro = await this.getRegistroByName(dto.nome);

            if(registro) {
                throw new Error("Documento já existe!");
            }
            
            const novoRegistro = models[this.modelo].create(dto);
            return novoRegistro
        } catch (error) {
            throw error;
        }
    }

    async updateRegistro(nome, dto) {
        const registro = await this.getRegistroByName(nome);
        try {
            if(!registro) {
                throw new Error("Documento não existe!");
            }

            await models[this.modelo].findOneAndUpdate({
                nome: nome
            }, dto);
        } catch (error) {
            throw error;
        }
    }

    async deleteRegistro(nome) {
        const registro = await this.getRegistroByName(nome);
        try {
            if(!registro) {
                throw new Error("Documento não existe!");
            }

            await models[this.modelo].findOneAndDelete({
                nome: nome
            });
        } catch (error) {
            throw error;
        }
    }
}

export default Services;