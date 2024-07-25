import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import { errorAuthMessage } from "../../../../utils/LoginUtils";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { BoxModal, SenhaError } from "./styles";
import { ButtonPrimaryComponent } from "../../../../styles";

function ModalCadastro({ openModal, handleClose }) {
	const [email, setEmail] = useState();
	const [emailConfirm, setEmailConfirm] = useState();
	const [senha, setSenha] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const cadastrar = async () => {
		setErrorMessage("");
		if(!isValidConfirm()) {
			return
		}

		await createUserWithEmailAndPassword( getAuth(), email, senha)
			.then((resp) => {
				alert("cadastrou");
			})
			.catch((erro) => {
				setErrorMessage(errorAuthMessage(erro.code));
			});
	};

	const close = () => {
		setErrorMessage("");
		handleClose();
	};

	const isValidConfirm = () => {
		if (email === emailConfirm) {
			return true
		}

		setErrorMessage("Emails não conferem");
		return false
	};

	return (
		<Modal open={openModal} onClose={close}>
			<BoxModal className="d-flex justify-content-end p-4">
				<h4 className="mb-4">CADASTRAR</h4>
				<TextField onChange={(e) => setEmail(e.target.value)} id="email" label="Email" size="small" className="mb-3 w-100" />
				<TextField onChange={(e) => setEmailConfirm(e.target.value)} id="email" label="Confirm Email" size="small" className="mb-3 w-100" />
				<TextField onChange={(e) => setSenha(e.target.value)} id="senha" label="Senha" size="small" className="mb-1 w-100" />
				<SenhaError className="mb-4"> A senha deve conter pelo menos 6 caracteres.</SenhaError>
				{errorMessage ? (
					<Alert severity="error" className="w-100 mb-3">
						{errorMessage}
					</Alert>
				) : (
					""
				)}
				<ButtonPrimaryComponent variant="contained" size="small" onClick={cadastrar}>
					Cadastrar
				</ButtonPrimaryComponent>
			</BoxModal>
		</Modal>
	);
}

export default ModalCadastro;
