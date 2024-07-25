import styled from "styled-components";
import Box from "@mui/material/Box";

export const BoxModal = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400;
	background-color: #fff;
	border-radius: 2px;
	flex-direction: column;
`;

export const SenhaError = styled.div`
	font-size: 11px;
`;
