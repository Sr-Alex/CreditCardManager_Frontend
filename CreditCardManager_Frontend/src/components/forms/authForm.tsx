import { useState } from "react";

import CreateUserForm from "./createUserForm";
import LoginForm from "./loginForm";
import Container from "../container";

function AuthForm() {
	const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

	return (
		<Container Title="Faça login para acessar seus cartões!">
			{showLoginForm ? <LoginForm /> : <CreateUserForm />}
			<button
				onClick={() => setShowLoginForm(!showLoginForm)}
				style={{
					backgroundColor: "transparent",
					color: "var(--color-black)",
					textDecoration: "underline",
				}}>
				{showLoginForm ? "Criar Conta" : "Login"}
			</button>
		</Container>
	);
}

export default AuthForm;
