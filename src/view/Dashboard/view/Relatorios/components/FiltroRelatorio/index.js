import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FiltroRelatoriosContent } from "./styles";
import { ButtonPrimaryComponent, ButtonSecondaryComponent, ModalSubTitle } from "../../../../../../styles";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import ServicosResourse from "../../../../../../resource/ServicosResourse";

const optionsStatusBase = [
	{ text: "Aguardando Confirmação", value: "AGUARDANDO_CONFIRMACAO" },
	{ text: "Confirmado", value: "CONFIRMADO" },
	{ text: "Cancelado", value: "CANCELADO" },
];

const filtroRelatorioEmpty = {
	dataInicial: null,
	dataFinal: null,
	servicos: [],
	status: []
};

function FiltroRelatorio({ handlefiltrar, handleBaixar, podeBaixar }) {
	const [filtroRelatorio, setFiltroRelatorio] = useState({ ...filtroRelatorioEmpty });
	const [optionsServico, setOptionsServico] = useState([]);
    const [optionsStatus] = useState([...optionsStatusBase]);

	useEffect(() => { ServicosResourse.listar().then((list) => setOptionsServico([...list]));}, [optionsServico]);

	const filtrar = () => handlefiltrar( filtroRelatorio );

    const handleChangeData = (value, key) => setFiltroRelatorio({ ...filtroRelatorio, [key]: value });

    const limpar = () => setFiltroRelatorio({ ...filtroRelatorioEmpty, servicos: [], status: [] });

	const toggleServicos = ( id) => {
		const index = filtroRelatorio.servicos.indexOf(id);
		index >= 0 ? filtroRelatorio.servicos.splice(index, 1) : filtroRelatorio.servicos.push(id);
	};

    const toggleStatus = ( id ) => {
		const index = filtroRelatorio.status.indexOf(id);
		index >= 0 ? filtroRelatorio.status.splice(index, 1) : filtroRelatorio.status.push(id);
	};

	return (
		<FiltroRelatoriosContent>
			<div className="row m-0 p-0 mb-3">
				<div className="col-6 ps-0">
					<DateTimePicker label="Data e hora" value={filtroRelatorio.dataInicial} onChange={(e) => handleChangeData(e, ["dataInicial"])} className="w-100 datepicker-h40px" />
				</div>
				<div className="col-6 pe-0">
					<DateTimePicker label="Data e hora" value={filtroRelatorio.dataFinal} onChange={(e) => handleChangeData(e, ["dataFinal"])} className="w-100 datepicker-h40px" />
				</div>
			</div>

			<div className="col-12 px-0 mb-1">
				<ModalSubTitle>SERVIÇOS</ModalSubTitle>
				{optionsServico.map((item, index) => (
					<FormControlLabel
						key={index}
						control={
							<Checkbox
								sx={{ color: "#f04695", "&.Mui-checked": { color: "#f04695" } }}
								checked={filtroRelatorio.servicos.indexOf(item.id) >= 0}
								onChange={() => toggleServicos(item.id)}
							/>
						}
						label={item.nome}
					/>
				))}
			</div>
			<div className="col-12 px-0 mb-3">
				<ModalSubTitle>STATUS</ModalSubTitle>
				{optionsStatus.map((item, index) => (
					<FormControlLabel
						key={index}
						control={
							<Checkbox
								sx={{ color: "#f04695", "&.Mui-checked": { color: "#f04695" } }}
								checked={filtroRelatorio.status.indexOf(item.value) >= 0}
								onChange={() => toggleStatus(item.value)}
							/>
						}
						label={item.text}
					/>
				))}
			</div> 
			<div className="d-flex justify-content-between">
				<div>
					{podeBaixar ? 
                        <ButtonSecondaryComponent variant="contained" size="small" onClick={() => handleBaixar()} className="me-3">
                            BAIXAR
                        </ButtonSecondaryComponent> 
                    : ""}					
				</div>
				<div className="d-flex justify-content-end">
					<ButtonPrimaryComponent variant="contained" size="small" onClick={() => limpar()} className="me-3">
						LIMPAR
					</ButtonPrimaryComponent>
					<ButtonPrimaryComponent variant="contained" size="small" onClick={() => filtrar()}>
						FILTRAR
					</ButtonPrimaryComponent>
				</div>
			</div>
		</FiltroRelatoriosContent>
	);
}

export default FiltroRelatorio;
