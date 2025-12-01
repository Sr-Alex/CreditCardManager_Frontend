import { useContext, useRef, type FormEvent } from "react";
import LoginContext from "./../../contexts/loginContext";
import { LoginUser } from "../../api/services/userServices";

function LoginForm() {
	const context = useContext(LoginContext);
	const userEmail = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		userEmail.current!.value = "";
		password.current!.value = "";
	};

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		if (!userEmail.current!.value || !password.current!.value) return;

		LoginUser(userEmail.current!.value, password.current!.value).then(
			(response) => {
				if (response) {
					context?.setIsLogged(true);
					handleReset();
				}
			}
		);
	};

	return (
		<form
			onSubmit={handleLogin}
			className="flex"
			style={{ flexDirection: "column", gap: "0.75rem" }}>
			<div>
				<label htmlFor="userEmail">Email de usuário:</label>
				<input
					type="text"
					id="userEmail"
					ref={userEmail}
					className="block"
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					ref={password}
					className="block"
				/>
			</div>
			<div>
				<button
					className="formButton rounded-full bg-blue"
					type="button"
					onClick={handleReset}>
					Limpar
				</button>
				<button
					type="submit"
					onClick={handleLogin}
					className="formButton rounded-full bg-blue">
					Login
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
