import http from "../utils/http.js";
import { openLoader } from "../utils/http.js";

const PREFIX = "/servicos";

const ServicosResourse = {
	async criarOuAtualizar(servico) {
		openLoader()
		return await http.post(PREFIX, servico);
	},
	async listar() {
		return await http.get(PREFIX);
	},
	async deletar( id ) {
		openLoader()
		return await http.delete(PREFIX  + "/" + id);
	},
};

export default ServicosResourse;
