import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BoxModal } from "./styles";
import { ButtonPrimaryComponent, ModalTitle, InputTextField, ModalSubTitle } from "../../../../../../styles";
import ServicosResourse from "../../../../../../resource/ServicosResourse";
import PerfilResourse from "../../../../../../resource/PerfilResourse";
import UsuarioResourse from "../../../../../../resource/UsuarioResourse";
import { estaValidadoUsuario } from "../../EquipeUtils";

const formEmpty = {
    nome: null,
    email: null,
    password: null,
    servicos: [],
	perfil: []
}

function ModalCadastroUsuario({ openModal, modalEdit, handleClose, cadastroCliente }) {
	const [errorMessage, setErrorMessage] = useState();
	const [form, setForm] = useState({ ...formEmpty });
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [optionsServico, setOptionsServico] = useState([]);
	const [optionsPerfil, setOptionsPerfil] = useState([]);

	useEffect(() => {
		if (modalEdit) {
			setForm({
				...modalEdit,
				servicos: [...modalEdit.servicos.map((item) => item.id)],
				perfil: [...modalEdit.perfil.map((item) => item.id)],
			});
			setConfirmPassword(modalEdit.password);
		}		
	}, [modalEdit]);

	useEffect(() => {
		if (cadastroCliente) setForm( prevForm => { return { ...prevForm, perfil: [4] }} );
	}, [cadastroCliente]);

	useEffect(() => {
		if (!cadastroCliente) ServicosResourse.listar().then((list) => setOptionsServico([...list]));
	}, [optionsServico, cadastroCliente]);

	useEffect(() => {
		if (!cadastroCliente) PerfilResourse.listar().then((list) => setOptionsPerfil([...list]));
	}, [optionsPerfil, cadastroCliente]);

	const handleChange = (event, key) => {
		setForm({ ...form, [key]: event });
	};

	const cadastrar = async () => {
		setErrorMessage("");
		
		if ( !estaValidadoUsuario(form, confirmPassword, setErrorMessage)) return

		UsuarioResourse.criarOuAtualizar( form ).then(() => { close() })
	};

	const close = () => {
		setErrorMessage("");
		setForm({ ...formEmpty, servicos: [], perfil: [] });
		setOptionsServico([]);
		setOptionsPerfil([]);
		setConfirmPassword(null)
		handleClose();
	};

	const toggleServicos = ( id ) => {
		let index = form.servicos.indexOf(id);

		if (index >= 0) {
			form.servicos.splice(index, 1);
			return;
		}

		form.servicos.push( id );
	};

	const togglePerfil = ( id ) => {
		form.perfil.splice(0, 1);
		form.perfil.push( id );
		if(id !== 3) setForm({ ...form, servicos: []})
	};

	return (
		<Modal open={openModal} onClose={close}>
			<BoxModal className="d-flex justify-content-end p-4" sx={{ width: "60%" }}>
				<ModalTitle>NOVO MEMBRO</ModalTitle>
				<div className="row m-0 p-0">
					<div className="col-6 ps-0">
						<InputTextField value={form.nome} onChange={(e) => handleChange(e.target.value, "nome")} id="nome" label="Nome" size="small" className="mb-3 w-100" />
					</div>
					<div className="col-6 px-0">
						<InputTextField value={form.email} onChange={(e) => handleChange(e.target.value, "email")} id="email" label="Email" size="small" className="mb-3 w-100" />
					</div>
					<div className="col-6 ps-0">
						<InputTextField
							value={form.password}
							onChange={(e) => handleChange(e.target.value, "password")}
							id="password"
							label="Senha"
							size="small"
							className="mb-3 w-100"
							type="password"
						/>
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
					{ !cadastroCliente && form.perfil.includes(3) ?
						<div className="col-12 px-0 mb-3">
							<ModalSubTitle>SERVIÇOS</ModalSubTitle>
							{optionsServico.map((item, index) => (
								<FormControlLabel
									key={index}
									control={
										<Checkbox sx={{ color: "#f04695", "&.Mui-checked": { color: "#f04695" } }} checked={form.servicos.indexOf(item.id) >= 0} onChange={() => toggleServicos(item.id)} />
									}
									label={item.nome}
								/>
							))}
						</div> 
					: "" }
					{ !cadastroCliente ?
						<div className="col-12 px-0 mb-3">
							<ModalSubTitle>PERFIL</ModalSubTitle>
							{optionsPerfil.map((item, index) => (
								<FormControlLabel
									key={index}
									control={
										<Checkbox sx={{ color: "#f04695", "&.Mui-checked": { color: "#f04695" } }} checked={form.perfil.indexOf(item.id) >= 0} onChange={() => togglePerfil(item.id)} />
									}
									label={item.nome}
								/>
							))}
						</div> 
					: "" }
				</div>

				{errorMessage ? (
					<Alert severity="error" className="w-100 mb-3">
						{" "}
						{errorMessage}{" "}
					</Alert>
				) : (
					""
				)}

				<ButtonPrimaryComponent variant="contained" size="small" onClick={cadastrar}>
					SALVAR
				</ButtonPrimaryComponent>
			</BoxModal>
		</Modal>
	);
}

export default ModalCadastroUsuario;
