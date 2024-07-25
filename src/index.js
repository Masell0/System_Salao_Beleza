import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';;

//cria rota para Tag com id #root
const root = ReactDOM.createRoot(document.getElementById('root'));

// renderização(inicialização) do projeto
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

export default root;