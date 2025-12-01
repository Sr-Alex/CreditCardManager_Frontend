import { useState } from "react";
import CreateUserForm from "./createUserForm";
import LoginForm from "./loginForm";

function AuthForm() {
	const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

	return (
		<>
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
		</>
	);
}

export default AuthForm;
