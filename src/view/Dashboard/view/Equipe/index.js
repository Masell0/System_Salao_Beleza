import React, { useEffect, useState } from "react";
import { TableTitle } from "../../../../styles";
import { ButtonPrimaryComponent, ButtonTableComponent } from "../../../../styles";
import { EquipeContent, HeaderContent } from "./styles";
import ModalCadastroUsuario from "./components/ModalCadastroUsuario";
import UsuarioResourse from "../../../../resource/UsuarioResourse";
import Alert from "@mui/material/Alert";

function Equipe() {
	const [openModal, setOpenModal] = useState(false);
	const [usuarios, setUsuarios] = useState([]);
	const [modalEdit, setModalEdit] = useState()
	const [errorMessage, setErrorMessage] = useState();

	useEffect(() => loadUsuarios(), [])

	const loadUsuarios = () => {
		UsuarioResourse.listar().then((list) => setUsuarios([...list]));
	}

	const deletar = (id) => {
		UsuarioResourse.deletar(id)
		.then(() => loadUsuarios())
		.catch((e) => {
			setErrorMessage("Usuario vinculado");
			setTimeout(() => { setErrorMessage(""); }, 3000);
		});
	};

	const handleOpenModal = ( item )  => {
		if ( item.id ) setModalEdit( item )
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		loadUsuarios()
		setModalEdit(null)
		setOpenModal(false);
	};

	return (
		<EquipeContent>
			<HeaderContent>
				<TableTitle>EQUIPE</TableTitle>
				<div>
					<ButtonPrimaryComponent onClick={handleOpenModal}>NOVO MEMBRO</ButtonPrimaryComponent>
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
						<th className="w-40">Nome</th>
						<th className="w-30">Email</th>
						<th className="w-20"></th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((item, index) => (
						<tr key={index}>
							<th>{item.id}</th>
							<td>{item.nome}</td>
							<td>{item.email}</td>
							<th className="d-flex justify-content-end pe-4">
								<ButtonTableComponent
									onClick={() => {
										handleOpenModal(item);
									}}
									className="me-3"
								>
									ABRIR
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
			<ModalCadastroUsuario openModal={openModal} handleClose={handleCloseModal} modalEdit={modalEdit} />
		</EquipeContent>
	);
}

export default Equipe;
