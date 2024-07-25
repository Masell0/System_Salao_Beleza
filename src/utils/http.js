import axios from "axios";
import qs from "qs";
import store from "../store";

//configuração do axios para as requisições
let axiosApiInstance = axios.create({
	baseURL: "http://localhost:8081",
	paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

//Trata a requisição na ida
axiosApiInstance.interceptors.request.use( async (config) => config );

//Trata a requisição na volta
axiosApiInstance.interceptors.response.use(
	//tratamento em caso de sucesso na requisição
	(response) => { 
		closeLoader()
		return response.data !== undefined && response.data !== null ? response.data : response },
	// tratamento em caso de erro na requisição
	async (error) => {
		let data = error?.response?.data;

		if (data?.type === "application/json") data = JSON.parse(await data.text());
		closeLoader();
		
		throw JSON.parse(data.message);
	}
);

export const openLoader = () => store.dispatch({ type: "ADD_LOADER" })

export const closeLoader = () => setTimeout(() => { store.dispatch({ type: "REMOVE_LOADER" });}, 1000);

export default axiosApiInstance;
