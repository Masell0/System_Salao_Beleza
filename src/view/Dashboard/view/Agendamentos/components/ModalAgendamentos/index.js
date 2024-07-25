import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { BoxModal } from "./styles";
import { ButtonPrimaryComponent, ModalTitle, InputTextField, ModalSubTitle } from "../../../../../../styles";
import SelectInput from "../../../../../../components/SelectInput";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { setValorFinal, formatarValor, estaValido } from "../../AgendamentoUtils";

import { useSelector } from "react-redux";

import ServicosResourse from "../../../../../../resource/ServicosResourse";
import AgendamentosResourse from "../../../../../../resource/AgendamentosResourse";


const optionsStatus = [
	{ text: "Aguardando Confirmação", value: "AGUARDANDO_CONFIRMACAO" },
	{ text: "Confirmado", value: "CONFIRMADO" },
	{ text: "Cancelado", value: "CANCELADO" },
];

const formEmpty = {
	usuario: null,
	nomeCliente: null,
	telefone: null,
	dataAgendamento: null,
	status: "AGUARDANDO_CONFIRMACAO",
	valorFinal: 0,
	servicos: []
};

function ModalAgendamento({ openModal, modalEdit, handleClose }) {
	const [errorMessage, setErrorMessage] = useState();
    const [form, setForm] = useState({ ...formEmpty });
	const [optionsServico, setOptionsServico] = useState([]);

	const usuario = useSelector((state) => state?.usuarioLogado);
	const permissaoUsuario = useSelector((state) => state?.usuarioLogado?.perfil[0]?.nome);

	useEffect(() => {
		if (modalEdit) setForm({ 
			...modalEdit, 
			servicos: [...modalEdit.servicos.map((item) => item.id)], 
			dataAgendamento: new Date(modalEdit.dataAgendamento) 
		});
	}, [modalEdit]);
	
	//requisição para banco de dados para buscar a listagem de serviços disponiveis
	useEffect(() => { ServicosResourse.listar().then((list) => setOptionsServico([...list]));}, [ optionsServico ]);

	const handleChangeText = (event, key) => setForm({ ...form, [key]: event.target.value })

	const handleChangeSelect = (value, key) => setForm({ ...form, [key]: value });

	const handleChangeData = (value) => setForm({ ...form, dataAgendamento: value });

	const cadastrar = async () => {
		setErrorMessage("");
		
		if (!estaValido(form, setErrorMessage)) return 

		let usuarioAgendamento = modalEdit?.usuario || usuario;

		AgendamentosResourse.criarOuAtualizar({ ...form, usuario: usuarioAgendamento })
		.then(() => { close(); });
	};

	const close = () => {
		setErrorMessage("");
		setForm({ ...formEmpty });
		setOptionsServico([]);
		handleClose();
	};

	const toggleServicos = ( id ) => {
		const index = form.servicos.indexOf(id);
		index >= 0 ? form.servicos.splice(index, 1) : form.servicos.push(id);
		setForm({ ...form, valorFinal: setValorFinal(form.servicos, optionsServico) });
	};

	return (
		<Modal open={openModal} onClose={close}>
			<BoxModal className="d-flex justify-content-end p-4" sx={{ width: "60%" }}>
				<ModalTitle>AGENDAMENTO</ModalTitle>
				<div className="row m-0 p-0">
					<div className="col-6 ps-0">
						<InputTextField
							id="nome"
							label="Nome Cliente"
							size="small"
							className="w-100 mb-3"
							onChange={(e) => handleChangeText(e, "nomeCliente")}
							value={form.nomeCliente}
							disabled={modalEdit?.status === "CANCELADO"}
						/>
					</div>
					<div className="col-6 pe-0">
						<InputTextField
							id="telefone"
							label="Telefone"
							size="small"
							className="w-100 mb-3"
							onChange={(e) => handleChangeText(e, "telefone")}
							value={form.telefone}
							disabled={modalEdit?.status === "CANCELADO"}
						/>
					</div>

					{["CLIENTE", "SUPERVISOR"].includes(permissaoUsuario) || modalEdit?.status === "CANCELADO" ? (
						""
					) : (
						<div className="col-6 ps-0">
							<SelectInput label="Status" optionsArray={optionsStatus} value={form.status} handleChange={(e) => handleChangeSelect(e, "status")} />
						</div>
					)}

					<div className={["CLIENTE", "SUPERVISOR"].includes(permissaoUsuario) || modalEdit?.status === "CANCELADO" ? "col-12 p-0 mb-3" : "col-6 pe-0"}>
						<DateTimePicker
							label="Data e hora"
							value={form.dataAgendamento}
							onChange={(e) => handleChangeData(e)}
							className="w-100 datepicker-h40px"
							disabled={modalEdit?.status === "CANCELADO"}
						/>
					</div>
				</div>

				<div className="col-12 px-0 mb-3">
					<ModalSubTitle>SERVIÇOS</ModalSubTitle>
					{optionsServico.map((item, index) => (
						<FormControlLabel
							key={index}
							control={
								<Checkbox
									sx={{ color: "#f04695", "&.Mui-checked": { color: "#f04695" } }}
									checked={form.servicos.indexOf(item.id) >= 0}
									onChange={() => toggleServicos(item.id)}
									disabled={modalEdit?.status === "CANCELADO"}
								/>
							}
							label={item.nome}
						/>
					))}
				</div>
				<div className="col-12 px-0 mb-3">
					<ModalSubTitle>VALOR: {formatarValor(form.valorFinal)}</ModalSubTitle>
				</div>

				{errorMessage ? (
					<Alert severity="error" className="w-100 mb-3">
						{errorMessage}
					</Alert>
				) : (
					""
				)}
				<ButtonPrimaryComponent variant="contained" size="small" onClick={cadastrar} disabled={modalEdit?.status === "CANCELADO"}>
					{modalEdit?.status === "CANCELADO" ? "AGENDAMENTO CANCELADO" : "SALVAR"}
				</ButtonPrimaryComponent>
			</BoxModal>
		</Modal>
	);
}

export default ModalAgendamento;
