import http from "../utils/http.js";
import { openLoader } from "../utils/http.js";

const PREFIX = "/agendamentos";

const AgendamentosResourse = {
	async listar(idUsuario) {
		return await http.get(PREFIX + "/" + idUsuario);
	},
	async criarOuAtualizar(agendamento) {
		openLoader();
		return await http.post(PREFIX, agendamento);
	},
	async gerarRelatorio( form ) {
		return await http.post( PREFIX + "/relatorios", form );
	},
};

export default AgendamentosResourse;
