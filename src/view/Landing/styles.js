import styled from "styled-components";
import UnhaImage from "../../assets/Unha.jpg";
import CabeloImage from "../../assets/Cabelo.jpg";
import MaquiagemImage from "../../assets/Maquiagem.jpg";


export const LandingContainer = styled.div`
`;

export const CardImg = styled.div`
	width: 33%;
	height: 90%;
	background-size: cover;
	background-position: center;
`;

export const UnhaCardImg = styled(CardImg)`
	background-image: url(${UnhaImage});
`;

export const CabeloCardImg = styled(CardImg)`
	background-image: url(${CabeloImage});
`;

export const MaquiagemCardImg = styled(CardImg)`
	background-image: url(${MaquiagemImage});
`;

export const CoverImg = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LandingTitle = styled.h1`
	color: #fff;
`;


