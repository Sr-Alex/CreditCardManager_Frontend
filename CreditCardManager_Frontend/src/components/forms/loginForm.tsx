import { useRef, type FormEvent } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { LoginUser } from "../../api/services/userServices";

function LoginForm() {
	const context = useAuthContext();
	const userEmail = useRef<HTMLInputElement>(null);
	const UserPassword = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		userEmail.current!.value = "";
		UserPassword.current!.value = "";
	};

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		const email = userEmail.current!.value;
		const password = UserPassword.current!.value;

		if (!email || !password) return;

		LoginUser(email, password).then((user) => {
			if (user.hasOwnProperty("id")) {
				context.login(user);
			}
		});
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
					placeholder="exemplo@gmail.com"
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					ref={UserPassword}
					placeholder="*********"
					className="input-text"
				/>
			</div>
			<div>
				<button
					className="form-button"
					type="button"
					onClick={handleReset}>
					Limpar
				</button>
				<button type="submit" className="form-button">
					Login
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
