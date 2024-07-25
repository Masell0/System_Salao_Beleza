import NavBar from "../../components/NavBar";
import { LandingContainer, UnhaCardImg, CabeloCardImg, MaquiagemCardImg, CoverImg, LandingTitle } from "./styles";

function Landing() {
	return (
		<div className="vh-100">
			<NavBar />
			<LandingContainer className="d-flex h-full justify-content-between align-items-center">
				<UnhaCardImg>
					<CoverImg className="w-100 h-100">
						<LandingTitle>VENHA CONHECER </LandingTitle>
					</CoverImg>
				</UnhaCardImg>

				<CabeloCardImg>
					<CoverImg className="w-100 h-100">
						<LandingTitle>NOSSOS </LandingTitle>
					</CoverImg>
				</CabeloCardImg>

				<MaquiagemCardImg>
					<CoverImg className="w-100 h-100">
						<LandingTitle>SERVIÇOS. </LandingTitle>.
					</CoverImg>
				</MaquiagemCardImg>
			</LandingContainer>
		</div>
	);
}

export default Landing;
