import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import { MeusDadosContent } from "./styles";
import { ButtonPrimaryComponent, ModalTitle, InputTextField,} from "../../../../styles";
import UsuarioResourse from "../../../../resource/UsuarioResourse";
import { estaValidadoUsuario } from "../Equipe/EquipeUtils";

import { useSelector, useDispatch } from "react-redux";

const formEmpty = {
	nome: null,
	email: null,
	password: null
};

function MeusDados() {
	const [errorMessage, setErrorMessage] = useState();
	const [form, setForm] = useState({ ...formEmpty });
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [success, setSuccess] = useState(null);

    const dadosUsuarios = useSelector((state) => state?.usuarioLogado);
    const dispatch = useDispatch();

    useEffect(() => {
		setForm(() => {
			return { id: dadosUsuarios.id, nome: dadosUsuarios.nome, email: dadosUsuarios.email, password: dadosUsuarios.password };
		});
	}, [dadosUsuarios]);
    

	const handleChange = (event, key) => setForm({ ...form, [key]: event });

	const cadastrar = async () => {
		setErrorMessage("");
		
		if (!estaValidadoUsuario(form, confirmPassword, setErrorMessage)) return;

		let novoForm = {
			...dadosUsuarios,
			...form,
			servicos: dadosUsuarios.servicos.map((item) => item.id),
			perfil: dadosUsuarios.perfil.map((item) => item.id),
		};

		UsuarioResourse.criarOuAtualizar(novoForm).then(() => {
			dispatch({ type: "UPDATE", usuarioLogado: { ...dadosUsuarios, ...form } });
			setSuccess(true)
			setTimeout(() => { setSuccess(false); }, 3000);
			close();
		});
	};

	const close = () => {
		setErrorMessage("");
		setForm({ ...formEmpty });
		setConfirmPassword(null);
	};

	return (
		<MeusDadosContent sx={{ width: "60%" }}>
			<ModalTitle>MEUS DADOS</ModalTitle>
			<div className="row m-0 p-0">
				<div className="col-6 ps-0">
					<InputTextField value={form.nome} onChange={(e) => handleChange(e.target.value, "nome")} id="nome" label="Nome" size="small" className="mb-3 w-100" />
				</div>
				<div className="col-6 px-0">
					<InputTextField value={form.email} onChange={(e) => handleChange(e.target.value, "email")} id="email" label="Email" size="small" className="mb-3 w-100" />
				</div>
				<div className="col-6 ps-0">
					<InputTextField value={form.password} onChange={(e) => handleChange(e.target.value, "password")} id="password" label="Senha" size="small" className="mb-3 w-100" type="password" />
				</div>
				<div className="col-6 px-0">
					<InputTextField
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						id="confirm-password"
						label="Confirmar Senha"
						size="small"
						className="mb-3 w-100"
						type="password"
					/>
				</div>
			</div>

			{errorMessage ? (
				<Alert severity="error" className="w-100 mb-3">
					{" "}
					{errorMessage}{" "}
				</Alert>
			) : (
				""
			)}

			{success ? (
				<Alert severity="success" className="w-100 mb-3">
					Alterações salvas com sucesso!
				</Alert>
			) : (
				""
			)}

			<ButtonPrimaryComponent variant="contained" size="small" onClick={cadastrar}>
				SALVAR
			</ButtonPrimaryComponent>
		</MeusDadosContent>
	);
}

export default MeusDados;
