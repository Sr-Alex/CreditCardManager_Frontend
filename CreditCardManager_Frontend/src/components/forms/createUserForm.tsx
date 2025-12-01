import { useContext, useRef, type FormEvent } from "react";

import LoginContext from "../../contexts/loginContext";

import { CreateUser } from "../../api/services/userServices";

function CreateUserForm() {
	const context = useContext(LoginContext);
	const userName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		userName.current!.value = "";
		email.current!.value = "";
		password.current!.value = "";
	};

	const handleCreateUser = (e: FormEvent) => {
		e.preventDefault();

		if (
			!userName.current!.value ||
			!email.current!.value ||
			password.current!.value.length < 6
		)
			return;

		CreateUser({
			userName: userName.current!.value,
			email: email.current!.value,
			password: password.current!.value,
		}).then((response) => {
			if (response) {
				context?.setIsLogged(true);
				handleReset();
			}
		});
	};

	return (
		<form
			onSubmit={handleCreateUser}
			className="flex"
			style={{ flexDirection: "column", gap: "0.75rem" }}>
			<div>
				<label htmlFor="name">Nome:</label>
				<input type="text" id="name" ref={userName} className="block" />
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" ref={email} className="block" />
			</div>
			<div>
				<label htmlFor="password">Senha:</label>
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
					className="formButton rounded-full bg-blue">
					Criar Usuário
				</button>
			</div>
		</form>
	);
}

export default CreateUserForm;
