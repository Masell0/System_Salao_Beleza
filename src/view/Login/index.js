import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ButtonPrimaryComponent, InputTextField } from "../../styles";
import { LoginContainer, LoginForm, CadastroText } from "./styles";

import Alert from "@mui/material/Alert";
import ModalCadastroUsuario from "../Dashboard/view/Equipe/components/ModalCadastroUsuario";

import UsuarioResourse from "../../resource/UsuarioResourse";
import { estaValido, getErrorMessage } from "./LoginUtils";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
	const [errorMessage, setErrorMessage] = useState();
	const [openModal, setOpenModal] = useState(false);
	
	const dispatch = useDispatch()
	const navigate = useNavigate();
	const dadosUsuarios = useSelector((state) => state?.usuarioLogado);

	//redireciona o usuario caso ja esteja logado 
	useEffect( () => { if(dadosUsuarios) navigate("/dashboard") },[dadosUsuarios, navigate])

    const logar = async () => {
		setErrorMessage("")
		
		if ( !estaValido({ email, password }, setErrorMessage) ) return

		await UsuarioResourse.login({ email, password })
			.then((resp) => {
				dispatch({ type: "LOG_IN", usuarioLogado: resp });
				navigate("/dashboard");
			})
			.catch((erro) => setErrorMessage(getErrorMessage(erro)));
    }

	const handleOpenModal = () => setOpenModal(true);;

	const handleCloseModal = () => setOpenModal(false);

    return (
		<LoginContainer className="d-flex align-items-center p-4">
			<h2 className="mb-1">LOGIN</h2>
			<LoginForm className="p-4 d-flex align-items-end">
				<InputTextField onChange={(e) => setEmail(e.target.value)} id="login" label="Login" size="small" className="mb-3 w-100" />
				<InputTextField onChange={(e) => setPassword(e.target.value)} id="password" label="Senha" size="small" className="mb-3 w-100" type="password" />

				{errorMessage ? (
					<Alert severity="error" className="w-100 mb-3">
						{errorMessage}
					</Alert>
				) : (
					""
				)}

				<div className="w-100 d-flex justify-content-between align-items-center">
					<CadastroText className="m-0 cadastro" onClick={handleOpenModal}>
						Não possui cadastro ?
					</CadastroText>
					<ButtonPrimaryComponent variant="contained" size="small" onClick={logar}>
						Entrar
					</ButtonPrimaryComponent>
				</div>
			</LoginForm>
			<ModalCadastroUsuario openModal={openModal} handleClose={handleCloseModal} cadastroCliente={true} />
		</LoginContainer>
	);
}

export default Login