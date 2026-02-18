import { useRef, useState, type FormEvent } from "react";

import useAuthContext from "../../hooks/useAuthContext";

import { CreateUser } from "../../api/services/userServices";
import type { UserDTO } from "../../api/dtos/userDtos";
import ActionButton from "../actionButton";
import useModalContext from "../../hooks/useModalContext";

function CreateUserForm() {
	const { login } = useAuthContext();
	const { closeModal } = useModalContext();

	const userName = useRef<HTMLInputElement>(null);
	const userEmail = useRef<HTMLInputElement>(null);
	const userPassword = useRef<HTMLInputElement>(null);

	const [isWaiting, setIsWaiting] = useState(false);

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

		setIsWaiting(true);

		CreateUser({
			userName: name,
			email: email,
			password: password,
		}).then((response) => {
			if (response.success) {
				handleReset();
				login(response.data as UserDTO);
				closeModal();
			}
		});

		setIsWaiting(false);
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
				<ActionButton
					className="form-button"
					type="button"
					onClick={handleReset}>
					Limpar
				</ActionButton>
				<ActionButton
					disabled={isWaiting}
					type="submit"
					className="form-button">
					{isWaiting ? "Waiting..." : "Criar Usuário"}
				</ActionButton>
			</div>
		</form>
	);
}

export default CreateUserForm;
