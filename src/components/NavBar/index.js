import { NavBarDashBoardComponent, IconLogoNavbar, NavBarButtom } from "./styles";
import iconLogo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rotas } from "../../router";
import { openLoader, closeLoader } from "../../utils/http";

//componente que renderiza o navbar
export default function NavBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const estaLogado = useSelector((state) => state?.usuarioLogado);
	const permissaoUsuario = useSelector((state) => state?.usuarioLogado?.perfil[0]?.nome);

	const logout = () => {
		openLoader()
		dispatch({ type: "LOG_OUT"})
		navigate("/")
		closeLoader()
	};

	return (
		<NavBarDashBoardComponent className="navbar navbar-expand-lg p-0">
			<div className="container-fluid">
				<IconLogoNavbar src={iconLogo} alt="Logo" />
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						{rotas.map((item, index) => {
							if (item.permissao.includes(permissaoUsuario)) {
								return (
									<li className="nav-item" key={index}>
										<NavBarButtom
											className="nav-link"
											aria-current="page"
											onClick={() => {
												navigate(item.path);
											}}
										>
											{item.name}
										</NavBarButtom>
									</li>
								);
							} else return "";
						})}
						<li className="nav-item">
							{ estaLogado ? 
								(	<NavBarButtom className="nav-link" aria-current="page" onClick={logout}>
										Logout
									</NavBarButtom> )
								:
								( 	<NavBarButtom className="nav-link" aria-current="page" onClick={() => { navigate("/login"); }}>
										Login
									</NavBarButtom>)
							}
							
							
						</li>
					</ul>
				</div>
			</div>
		</NavBarDashBoardComponent>
	);
}
