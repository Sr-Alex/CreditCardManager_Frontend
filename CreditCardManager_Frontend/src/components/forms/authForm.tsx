import { useState } from "react";

import CreateUserForm from "./createUserForm";
import LoginForm from "./loginForm";
import Container from "../container";

function AuthForm() {
	const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

	return (
		<Container title="Faça login para acessar seus cartões!">
			{showLoginForm ? <LoginForm /> : <CreateUserForm />}

			<button
				type="button"
				onClick={() => setShowLoginForm(!showLoginForm)}
				className="cursor-pointer text-blue underline">
				{showLoginForm ? "Criar Conta" : "Login"}
			</button>
		</Container>
	);
}

export default AuthForm;
