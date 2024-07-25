import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./view/Landing";
import Login from "./view/Login";
import Dashboard from "./view/Dashboard";
import Agendamentos from "./view/Dashboard/view/Agendamentos";
import Equipe from "./view/Dashboard/view/Equipe";
import Servicos from "./view/Dashboard/view/Servicos";
import MeusDados from "./view/Dashboard/view/MeusDados";
import Relatorios from "./view/Dashboard/view/Relatorios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

//array de configuração das rotas do projeto
export const rotas = [
	{
		id: "agendamentos",
		name: "Agendamentos",
		path: "/dashboard/agendamentos",
		permissao: ["ADMIN", "TRABALHADOR", "CLIENTE"],
	},
	{
		id: "equipe",
		name: "Equipe",
		path: "/dashboard/equipe",
		permissao: ["ADMIN", "SUPERVISOR"],
	},
	{
		id: "servicos",
		name: "Serviços",
		path: "/dashboard/servicos",
		permissao: ["ADMIN", "SUPERVISOR"],
	},
	{
		id: "relatorios",
		name: "Relatorios",
		path: "/dashboard/relatorios",
		permissao: ["ADMIN", "SUPERVISOR"],
	},
	{
		id: "dados",
		name: "Meus Dados",
		path: "/dashboard/dados",
		permissao: ["ADMIN", "SUPERVISOR", "TRABALHADOR", "CLIENTE"],
	},
];

const getPath = ( id ) => rotas.find(rota => rota.id === id).path

//componente de rotas 
function AllRoutes() {
	const dispatch = useDispatch();
	const showLoader = useSelector((state) => state?.loader);

	//verifica se o usuario ja esta logado 
	useEffect(() => {
		const usuarioLogado = JSON.parse( localStorage.getItem("usuarioLogado") );
		if (usuarioLogado) dispatch({ type: "UPDATE", usuarioLogado: usuarioLogado });
	}, [dispatch]);

	return (
		<BrowserRouter>
		{/* Configuração das rotas e qual componente chamar em cada rota */}
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path={getPath("agendamentos")} Component={Agendamentos} />
					<Route path={getPath("equipe")} Component={Equipe} />
					<Route path={getPath("servicos")} Component={Servicos} />
					<Route path={getPath("dados")} Component={MeusDados} />
					<Route path={getPath("relatorios")} Component={Relatorios} />
				</Route>
			</Routes>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</BrowserRouter>
	);
}

export default AllRoutes;