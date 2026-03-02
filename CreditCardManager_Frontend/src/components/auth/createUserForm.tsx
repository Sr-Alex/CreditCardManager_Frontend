import { useRef, useState, type FormEvent } from "react";

import type { UserDTO } from "../../api/dtos/userDtos";
import { CreateUser } from "../../api/services/userServices";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import ActionButton from "../actionButton";
import UserCardsListContainer from "../card/userCardsListContainer";
import { Eye, EyeClosed } from "lucide-react";

function CreateUserForm() {
	const { login } = useAuthContext();
	const { openModal } = useModalContext();

	const userName = useRef<HTMLInputElement>(null);
	const userEmail = useRef<HTMLInputElement>(null);
	const userPassword = useRef<HTMLInputElement>(null);

	const [showPassword, setShowPassword] = useState(false);
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
				openModal(<UserCardsListContainer />);
			}
		});

		setIsWaiting(false);
	};

	return (
		<form onSubmit={handleCreateUser} className="flex flex-col gap-3">
			<div>
				<label title="Seu nome de usuário" htmlFor="name">
					Nome:
				</label>
				<input
					type="text"
					id="name"
					ref={userName}
					placeholder="Nome do usuário"
					className="input-text"
				/>
			</div>
			<div>
				<label title="Seu email de acesso." htmlFor="email">
					Email:
				</label>
				<input
					type="email"
					id="email"
					ref={userEmail}
					placeholder="exemplo@gmail.com"
					className="input-text"
				/>
			</div>
			<div>
				<label title="Sua senha de acesso." htmlFor="password">
					Senha:
				</label>
				<div className="input-text flex flex-nowrap px-0">
					<input
						type={showPassword ? "text" : "password"}
						ref={userPassword}
						id="password"
						placeholder="*********"
						className="w-full px-2"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="px-2">
						{showPassword ? (
							<Eye className="h-full aspect-square" />
						) : (
							<EyeClosed className="h-full aspect-square" />
						)}
					</button>
				</div>
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
					{isWaiting ? "Aguardando..." : "Criar Usuário"}
				</ActionButton>
			</div>
		</form>
	);
}

export default CreateUserForm;
