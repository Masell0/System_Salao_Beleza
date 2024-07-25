import http from "../utils/http.js";
import { openLoader } from "../utils/http.js";

const PREFIX = "/usuario";


const UsuarioResourse = {
	async login(login) {
		openLoader()
		return await http.post(PREFIX + `/login`, login);
	},
	async criarOuAtualizar(usuario) {
		openLoader();
		return await http.post(PREFIX, usuario);
	},
	async listar() {
		return await http.get(PREFIX);
	},
	async deletar(id) {
		openLoader();
		return await http.delete(PREFIX + "/" + id);
	},
};

export default UsuarioResourse;
