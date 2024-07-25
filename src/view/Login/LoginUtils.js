const estaValido = ( login, setMessage ) => {
	if ( !login.email || !login.password ) {
		setMessage( "Email e senha sâo obrigatorios" )
		return false
	}

	return true
}

const getErrorMessage = ( error ) => {
	switch (error.fieldErrors.usuario[0]) {
		case "nao_existe":
			return "Usuario não existe."
		case "usuario_invalido":
			return "Usuario ou Senha invalidos."
		default:
			break;
	}
}

export { 
	estaValido,
	getErrorMessage
};