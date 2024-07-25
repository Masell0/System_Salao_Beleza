import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { BoxModal } from "./styles";
import { ButtonPrimaryComponent, ModalTitle, InputTextField } from "../../../../../../styles";
import { NumericFormat } from "react-number-format";
import ServicosResourse from "../../../../../../resource/ServicosResourse";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(props, ref) {
	const { onChange, ...other } = props;

	return (
		<NumericFormat {...other} getInputRef={ref}
			onValueChange={( valor ) => onChange(valor.floatValue, "valor") }
			thousandSeparator valueIsNumericString prefix="R$ "
		/>
	);
});

NumericFormatCustom.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const formEmpty = {
    nome: null,
	valor: null
}

const estaValido = ( nome , valor, setErrorMessage ) => {
	if (!nome || !valor) {
		setErrorMessage("Nome e Valor sâo obrigatorios");
		return false;
	}

	return true;
}

function ModalServico({ openModal, modalEdit, handleClose }) {
	const [errorMessage, setErrorMessage] = useState();
	const [form, setForm] = React.useState({ ...formEmpty });

	const handleChange = (event, key) => { setForm({ ...form, [key]: event }); };

	const cadastrar = async () => {
		setErrorMessage("");
		if ( !estaValido(form.nome, form.valor, setErrorMessage) ) return

		ServicosResourse.criarOuAtualizar( form ).then( () => close() )
	};

	const close = () => {
		setForm({ ...formEmpty });
		setErrorMessage("");
		handleClose();
	};

	useEffect( () => { 
		if ( modalEdit ) setForm( modalEdit ) 
	}, [modalEdit])

	return (
		<Modal open={openModal} onClose={close}>
			<BoxModal className="d-flex justify-content-end p-4" sx={{ width: "60%" }}>
				<ModalTitle>SERVIÇO</ModalTitle>
				<div className="row m-0 p-0">
					<div className="col-6 ps-0">
						<InputTextField value={form.nome} onChange={(e) => handleChange(e.target.value, "nome")} id="nome" label="Nome Serviço" size="small" className="mb-3 w-100" />
					</div>
					<div className="col-6 pe-0">
						<TextField label="Valor em Reais" value={form.valor} onChange={handleChange} name="valor" id="valor" size="small" className="w-100"
						InputProps={{ inputComponent: NumericFormatCustom }} />
					</div>
				</div>

				{errorMessage ? ( <Alert severity="error" className="w-100 mb-3"> {errorMessage} </Alert> ) : ( "" )}

				<ButtonPrimaryComponent variant="contained" size="small" onClick={cadastrar}>
					SALVAR
				</ButtonPrimaryComponent>
			</BoxModal>
		</Modal>
	);
}

export default ModalServico;
