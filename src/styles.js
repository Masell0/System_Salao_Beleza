import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const ButtonPrimaryComponent = styled(Button)`
	background-color: #48142c !important;
	box-shadow: none !important;
	color: #fff !important;

	&:hover {
		background-color: #f04695 !important;
		box-shadow: none !important;
	}
`;

export const ButtonSecondaryComponent = styled(Button)`
	background-color: #f04695 !important;
	box-shadow: none !important;
	color: #fff !important;

	&:hover {
		background-color: #48142c !important;
		box-shadow: none !important;
	}
`;

export const ButtonTableComponent = styled(Button)`
	background-color: #f04695 !important;
	font-size: 12px !important;
	padding: 3px !important;
	box-shadow: none !important;
	color: #fff !important;

	&:hover {
		background-color: #48142c !important;
		box-shadow: none !important;
	}
`;

export const InputTextField = styled(TextField)`
	background-color: #fff;
`;

export const TableTitle = styled.h2`
	color: #48142c;
	margin: 0px !important;
`;


export const ModalTitle = styled.h3`
	color: #48142c;
	margin-bottom: 30px;
`;

export const ModalSubTitle = styled.h5`
	color: #48142c;
	margin-bottom: 5px;
`;