import { useRef, useState, type FormEvent } from "react";

import { AddUser } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";

import ActionButton from "../actionButton";
import useModalContext from "../../hooks/useModalContext";

function AddUserForm() {
	const { isLogged, card, updateCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const [isWaiting, setIsWaiting] = useState<boolean>(false);

	const userEmail = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		userEmail.current!.value = "";
	};

	const handleAddUser = async (event: FormEvent) => {
		event.preventDefault();

		const email = userEmail.current?.value || "";

		if (!isLogged || !card?.id || email.length == 0) return;

		setIsWaiting(true);

		const response = await AddUser(card.id, email.toString());
		if (response.success) {
			updateCard();
			setIsWaiting(false);
			closeModal();
		}

		handleReset();
		setIsWaiting(false);
	};

	return (
		<form onSubmit={(e) => handleAddUser(e)}>
			<div>
				<label htmlFor="userEmail">Email do usuário: </label>
				<input
					type="text"
					name="userEmail"
					id="userEmail"
					className="input-text"
					minLength={8}
					placeholder="useremail@example.com"
					required
					ref={userEmail}
				/>
			</div>
			<ActionButton
				type="submit"
				disabled={isWaiting}
				className="mt-2 p-2 rounded-lg">
				Adicionar
			</ActionButton>
		</form>
	);
}

export default AddUserForm;
