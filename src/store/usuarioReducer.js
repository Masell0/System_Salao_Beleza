const INITIAL_STATE = {
    usuarioLogado: null,
	loader: null
}

export default function usuarioReducer(state = INITIAL_STATE, action) {

		switch (action.type) {
			case "LOG_IN":
			case "UPDATE":
				localStorage.setItem("usuarioLogado", JSON.stringify(action.usuarioLogado));
				return { ...state, usuarioLogado: action.usuarioLogado };
			case "LOG_OUT":
				localStorage.clear();
				return { ...state, usuarioLogado: null };
			case "ADD_LOADER":
				return {...state, loader: true};
			case "REMOVE_LOADER":
				return { ...state, loader: false };
			default:
				break;
		}
}