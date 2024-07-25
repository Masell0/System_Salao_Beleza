import React, { useState, useRef } from "react";
import { TableTitle } from "../../../../styles";
import { RelatoriosContent, HeaderContent } from "./styles";
import AgendamentosResourse from "../../../../resource/AgendamentosResourse";
import { formatarData, getLabel} from "../Agendamentos/AgendamentoUtils";
import FiltroRelatorio from "./components/FiltroRelatorio";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const formatarValor = (valor) => {
	return `R$ ${valor},00`;
};

const formatarServicos = ( servicos ) => {
    let servicosString = ""
    
    servicos.forEach((servico, index) => {
        servicosString += servico.nome
        if(index + 1 !== servicos.length) servicosString += ", "
    });

    return servicosString;
}

function Relatorios() {
	const [agendamentos, setAgendamentos] = useState([]);
    const canvasRef = useRef(null)

	const gerarRelatorio = ( filtro ) => {
		AgendamentosResourse.gerarRelatorio( filtro ).then((list) => { setAgendamentos([...list]) });
	};

    const generatePDF = ( canvasRef ) => {
        html2canvas(canvasRef.current)
        .then( canvas => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("p", "mm", "a4");
				const imgProps = pdf.getImageProperties(imgData);
				const pdfWidth = pdf.internal.pageSize.getWidth() - 10;
				const pdfHeight = ( (imgProps.height * pdfWidth) / imgProps.width);

                const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;

				pdf.addImage(imgData, "PNG", x, 10, pdfWidth, pdfHeight);
				pdf.save("download.pdf");
        });
    };

    const baixarRelatorio = () => generatePDF( canvasRef );

	return (
		<RelatoriosContent>
			<HeaderContent>
				<TableTitle>RELATORIO</TableTitle>
			</HeaderContent>

			<FiltroRelatorio handlefiltrar={gerarRelatorio} podeBaixar={agendamentos.length > 0} handleBaixar={baixarRelatorio} />

			<table className="table table-striped" ref={canvasRef}>
				<thead>
					<tr>
						<th scope="col">ID.</th>
						<th scope="col">Nome</th>
						<th scope="col">Data</th>
						<th scope="col">Status</th>
						<th scope="col">Serviços</th>
						<th scope="col">Valor</th>
					</tr>
				</thead>
				<tbody>
					{agendamentos.map((item, index) => (
						<tr key={index}>
							<th>{item.id}</th>
							<td>{item.nomeCliente}</td>
							<td className="table-date">{formatarData(item.dataAgendamento)}</td>
							<td className="table-status">{getLabel(item.status)}</td>
							<td className="servicos-relatorios-table">{formatarServicos(item.servicos)}</td>
							<td>{formatarValor(item.valorFinal)}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td class="total-table">Total:</td>
						<td class="total-table">
							{formatarValor(
								agendamentos.reduce((total, objeto) => {
									return parseFloat(total) + parseFloat(objeto.valorFinal);
								}, 0)
							)}
						</td>
					</tr>
				</tfoot>
			</table>
		</RelatoriosContent>
	);
}

export default Relatorios;
