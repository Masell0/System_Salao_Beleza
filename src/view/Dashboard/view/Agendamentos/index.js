import React, { useEffect, useState } from "react";
import { TableTitle } from "../../../../styles";
import { ButtonPrimaryComponent, ButtonTableComponent } from "../../../../styles";
import { AgendemanetosContent, HeaderContent } from "./styles";
import ModalAgendamento from "./components/ModalAgendamentos";
import AgendamentosResourse from "../../../../resource/AgendamentosResourse";
import { useSelector } from "react-redux";
import { formatarData, formatarTelefone, getLabel } from "./AgendamentoUtils";

const formatarValor = (valor) => {
	return `R$ ${valor},00`;
};

function Agendamentos() {
	const [openModal, setOpenModal] = useState(false);
	const [agendamentos, setAgendamentos] = useState([]);
	const [modalEdit, setModalEdit] = useState();

	const idUsuario = useSelector((state) => state?.usuarioLogado?.id);

	//faz a requisição para banco de dados assim que o componente rendenrizar
	useEffect(() => { if (idUsuario) loadAgendamentos(); }, [idUsuario]);

	const loadAgendamentos = () => {
		AgendamentosResourse.listar( idUsuario ).then((list) => setAgendamentos((prev) => [...list]));
	};

	//abre a modal
	const handleOpenModal = ( item ) => {
		if (item.id) setModalEdit(item);
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		loadAgendamentos();
		setModalEdit(null);
		setOpenModal(false);
	};

	return (
		<AgendemanetosContent>
			<HeaderContent>
				<TableTitle>AGENDAMENTOS</TableTitle>
				<div>
					<ButtonPrimaryComponent onClick={handleOpenModal}>NOVO AGENDAMENTO</ButtonPrimaryComponent>
				</div>
			</HeaderContent>

			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID.</th>
						<th scope="col">Nome</th>
						<th scope="col">Telefone</th>
						<th scope="col">Data</th>
						<th scope="col">Status</th>
						<th scope="col">Valor</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{agendamentos.map((item, index) => (
						<tr key={index}>
							<th>{item.id}</th>
							<td>{item.nomeCliente}</td>
							<td>{formatarTelefone(item.telefone)}</td>
							<td className="table-date">{formatarData(item.dataAgendamento)}</td>
							<td className="table-status">{getLabel(item.status)}</td>
							<td>{formatarValor(item.valorFinal)}</td>
							<th className="d-flex justify-content-end pe-4">
								<ButtonTableComponent
									onClick={() => {
										handleOpenModal(item);
									}}
								>
									ABRIR
								</ButtonTableComponent>
							</th>
						</tr>
					))}
				</tbody>
			</table>
			<ModalAgendamento openModal={openModal} handleClose={handleCloseModal} modalEdit={modalEdit} />
		</AgendemanetosContent>
	);
}

export default Agendamentos;
