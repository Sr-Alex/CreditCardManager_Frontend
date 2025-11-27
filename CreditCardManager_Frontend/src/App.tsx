import { useState } from "react";

import Header from "./components/header";
import UserList from "./components/userList";
import LoginForm from "./components/forms/loginForm";
import FormContainer from "./components/formContainer";

import "./App.css";

function App() {
	const [isLogged, serIsLogged] = useState(false);

	return (
		<main>
			<Header />
			<UserList cardId={1} />
			<FormContainer>
				<LoginForm />
			</FormContainer>
		</main>
	);
}

export default App;
