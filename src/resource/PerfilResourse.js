import http from "../utils/http.js";
const PREFIX = "/perfil";

const PerfilResourse = {
	async listar() {
		return await http.get(PREFIX);
	},
};

export default PerfilResourse;
