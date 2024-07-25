import React, { useEffect, useState } from "react";
import { TableTitle } from "../../../../styles";
import { ButtonPrimaryComponent, ButtonTableComponent } from "../../../../styles";
import { ServicoContent, HeaderContent } from "./styles";
import ModalServico from "./components/ModalServico";
import Alert from "@mui/material/Alert";
import ServicosResourse from "../../../../resource/ServicosResourse";

function Servico() {
	const [openModal, setOpenModal] = useState(false);
	const [servicos, setServicos] = useState([]);
	const [modalEdit, setModalEdit] = useState( null );
	const [errorMessage, setErrorMessage] = useState();

	useEffect(() => {
		loadServicos();
	}, [ servicos ]);

	const handleOpenModal = ( edit ) => {
		if (edit.nome && edit.valor) setModalEdit(edit);
		setOpenModal( true );
	};

	const handleCloseModal = () => {
		setModalEdit( null );
		setOpenModal( false );
	};

	const loadServicos = () => {
		ServicosResourse.listar().then((list) => setServicos([...list]));
	}

	const deletar = ( id ) => {
		setErrorMessage("");
		ServicosResourse.deletar(id)
			.then(() => loadServicos())
			.catch((e) => {
				setErrorMessage("Serviço vinculado");
				setTimeout(() => {
					setErrorMessage("");
				}, 3000);
			});
	}
	
	const formatarValor = ( valor ) => {
		return `R$ ${valor},00`
	}

	return (
		<ServicoContent>
			<HeaderContent>
				<TableTitle>SERVIÇOS</TableTitle>
				<div>
					<ButtonPrimaryComponent onClick={handleOpenModal}>NOVO SERVIÇO</ButtonPrimaryComponent>
				</div>
			</HeaderContent>

			{errorMessage ? (
				<Alert severity="error" className="w-100 mb-3">
					{errorMessage}
				</Alert>
			) : (
				""
			)}

			<table className="table table-striped">
				<thead>
					<tr>
						<th className="w-10">ID.</th>
						<th className="w-40">NOME</th>
						<th className="w-30">VALOR</th>
						<th className="w-20"></th>
					</tr>
				</thead>
				<tbody>
					{servicos.map((item, index) => (
						<tr key={index}>
							<th>{item.id}</th>
							<td>{item.nome}</td>
							<td>{formatarValor(item.valor)}</td>
							<th className="d-flex justify-content-end pe-4">
								<ButtonTableComponent
									onClick={() => {
										handleOpenModal(item);
									}}
									className="me-3"
								>
									EDITAR
								</ButtonTableComponent>
								<ButtonTableComponent
									onClick={() => {
										deletar(item.id);
									}}
								>
									DELETAR
								</ButtonTableComponent>
							</th>
						</tr>
					))}
				</tbody>
			</table>
			<ModalServico openModal={openModal} handleClose={handleCloseModal} modalEdit={modalEdit} />
		</ServicoContent>
	);
}

export default Servico;
