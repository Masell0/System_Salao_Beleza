import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../../components/NavBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rotas } from "../../router";
import { DashboardContent } from "./styles";

const temLocalStorage = JSON.parse(localStorage.getItem("usuarioLogado"));

function Dashboard() {
	const location = useLocation();
	const navigate = useNavigate();

	const estaLogado = useSelector((state) => state?.usuarioLogado);
	const permissaoUsuario = useSelector((state) => state?.usuarioLogado?.perfil[0]?.nome);
	
	//observa se o usuario entrando em rota que ele não tem permissão 
	useEffect(() => {
		if(location.pathname === "/dashboard") return

		const rotaAtual = location.pathname.replace("/dashboard/", "");
		const permissoes = rotas.find((rota) => rota.id === rotaAtual).permissao;

		if (!permissoes.includes(permissaoUsuario)) navigate("/dashboard");
	}, [location.pathname, navigate, permissaoUsuario]);

	//observa se o usuario esta entrando no sistema sem estar logado, se estiver deslogado redireciona pra home
	useEffect( () => { if (!estaLogado && !temLocalStorage) navigate("/"); }, [estaLogado, navigate]);

	return (
		<div className="dashboard">
			<NavBar />
			<DashboardContent>
				<Outlet />
			</DashboardContent>
		</div>
	);
}

export default Dashboard;
