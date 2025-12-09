import { useContext, useRef, type FormEvent } from "react";

import LoginContext from "../../contexts/loginContext";

import { CreateUser } from "../../api/services/userServices";
import type { UserDTO } from "../../api/dtos/userDtos";

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
			console.log("logado");
			if (response) {
				handleReset();
				context?.setUser(response as UserDTO);
				context?.setIsLogged(true);
			}
		});
	};

	return (
		<form onSubmit={handleCreateUser} className="flex flex-col gap-3">
			<div>
				<label htmlFor="name">Nome:</label>
				<input
					type="text"
					id="name"
					ref={userName}
					placeholder="Nome do usuário"
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					ref={email}
					placeholder="exemplo@gmail.com"
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="password">Senha:</label>
				<input
					type="password"
					id="password"
					ref={password}
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
					Criar Usuário
				</button>
			</div>
		</form>
	);
}

export default CreateUserForm;
