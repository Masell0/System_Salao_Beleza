export const estaValidadoUsuario = (form, confirmPassword, setMessage) => {
	let message = null;

	if (!form?.nome) {
		message = "Nome é obrigatorio";
	} else if (!form?.email) {
		message = "Email é obrigatorio";
	} else if (!form?.password) {
		message = "Senha é obrigatoria";
	} else if (form?.password !== confirmPassword) {
		message = "As senha não conferem";
	}

	setMessage(message);

	return !message;
};
