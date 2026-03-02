import { useRef, useState, type FormEvent } from "react";

import { LoginUser } from "../../api/services/userServices";

import type { UserDTO } from "../../api/dtos/userDtos";

import useAuthContext from "../../hooks/useAuthContext";

import ActionButton from "../actionButton";
import useModalContext from "../../hooks/useModalContext";
import UserCardsListContainer from "../card/userCardsListContainer";
import { Eye, EyeClosed } from "lucide-react";

function LoginForm() {
	const { login } = useAuthContext();
	const { openModal } = useModalContext();

	const userEmail = useRef<HTMLInputElement>(null);
	const UserPassword = useRef<HTMLInputElement>(null);

	const [showPassword, setShowPassword] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	const handleReset = () => {
		userEmail.current!.value = "";
		UserPassword.current!.value = "";
	};

	const handleLogin = (e: FormEvent) => {
		e.preventDefault();
		const email = userEmail.current!.value;
		const password = UserPassword.current!.value;

		if (!email || !password) return;

		setIsWaiting(true);

		LoginUser(email, password).then((response) => {
			if (response.success) {
				login(response.data as UserDTO);
				openModal(<UserCardsListContainer />);
			}
		});

		setIsWaiting(false);
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
				<div className="input-text flex px-0">
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						ref={UserPassword}
						placeholder="*********"
						className="flex-2 px-2"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="flex-1 px-2">
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
					{isWaiting ? "Aguardando..." : "login"}
				</ActionButton>
			</div>
		</form>
	);
}

export default LoginForm;
