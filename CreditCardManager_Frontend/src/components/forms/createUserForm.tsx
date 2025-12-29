import { useContext, useRef, type FormEvent } from "react";

import AuthContext from "../../contexts/authContext";

import { CreateUser } from "../../api/services/userServices";
import type { UserDTO } from "../../api/dtos/userDtos";

function CreateUserForm() {
	const context = useContext(AuthContext);
	const userName = useRef<HTMLInputElement>(null);
	const userEmail = useRef<HTMLInputElement>(null);
	const userPassword = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		userName.current!.value = "";
		userEmail.current!.value = "";
		userPassword.current!.value = "";
	};

	const handleCreateUser = (e: FormEvent) => {
		e.preventDefault();
		const name = userName.current!.value;
		const email = userEmail.current!.value;
		const password = userPassword.current!.value;

		if (!name || !email || password?.length < 6) return;

		CreateUser({
			userName: name,
			email: email,
			password: password,
		}).then((user) => {
			if (user.hasOwnProperty("id")) {
				handleReset();
				context.login(user as UserDTO);
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
					ref={userEmail}
					placeholder="exemplo@gmail.com"
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="password">Senha:</label>
				<input
					type="password"
					id="password"
					ref={userPassword}
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
