import { format } from "date-fns";

export function formatarTelefone(numero) {
	const regex11Digitos = /^(\d{2})(\d{5})(\d{4})$/;
	const regex8Digitos = /^(\d{4})(\d{4})$/;
	const regex9Digitos = /^(\d{5})(\d{4})$/;

	switch (numero.length) {
		case 8:
			return numero.replace(regex8Digitos, "$1-$2");
		case 9:
			return numero.replace(regex9Digitos, "$1-$2");
		case 11:
			return numero.replace(regex11Digitos, "($1) $2-$3");
		default:
			return numero;
	}
}

export function formatarData(data) {
	const date = new Date(data);
	return format(date, "dd/MM/yyyy | HH:mm");
}

export function getLabel(id) {
	switch (id) {
		case "AGUARDANDO_CONFIRMACAO":
			return "Aguardando Confirmação";
		case "CONFIRMADO":
			return "Confirmado";
		case "CANCELADO":
			return "Cancelado";
		default:
			break;
	}
}

export const setValorFinal = (servicos, options) => {
	let valorFinal = 0;

	servicos.forEach((id) => {
		valorFinal += Number.parseFloat(options.find((item) => id === item.id).valor);
	});
	return valorFinal.toString();
};

export const formatarValor = (valor) => {
	return `R$ ${valor},00`;
};

export const estaValido = (form, setMessage) => {
	let message = null;

	if (!form?.nomeCliente) {
		message = "Nome é obrigatorio";
	} else if (!form?.telefone) {
		message = "Telefone é obrigatorio";
	} else if (!form?.dataAgendamento) {
		message = "Data é obrigatoria";
	} else if (new Date(form?.dataAgendamento) <= new Date()) {
		message = "Data deve ser maior que a data atual";
	} else if (form?.servicos.length <= 0) {
		message = "Selecione os serviços";
	}

	setMessage(message);

	return !message;
};
