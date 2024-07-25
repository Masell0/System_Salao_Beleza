import AllRoutes from "./router";
import "./app.css"
import store from "./store";
import { ptBR } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Provider } from "react-redux";
import styled from "styled-components";

export const AppContainer = styled.div``;

//primeiro componente usado para configurações globais do projeto 
function App() {
	return (
		//configuração da store(espaço das variaveis globais) 
		<Provider store={store}>
			<AppContainer className="App">
				{/* configuração do locate pro input datepicker */}
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
					{/* renderização das rotas do projeto */}
					<AllRoutes />
				</LocalizationProvider>
			</AppContainer>
		</Provider>
	);
}

export default App;
