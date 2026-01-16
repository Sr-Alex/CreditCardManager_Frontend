import { useRef, type FormEvent } from "react";

import { useAuthContext } from "../../contexts/authContext";

import { CreateCreditCard } from "../../api/services/creditCardServices";
import type { CreateCreditCardDTO } from "../../api/dtos/creditCardDtos";

function CreateCardForm() {
	const { updateCard, user } = useAuthContext();

	const cardName = useRef<HTMLInputElement>(null);
	const expiresAt = useRef<HTMLInputElement>(null);
	const limit = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		cardName.current!.value = "";
		expiresAt.current!.value = "";
		limit.current!.value = "";
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!user) {
			return;
		}

		const createCard: CreateCreditCardDTO = {
			userId: Number(user.id),
			cardName: cardName.current?.value || undefined,
			expiresAt: expiresAt.current?.value || undefined,
			Limit: limit.current?.value || undefined,
		};

		CreateCreditCard(createCard).then((response) => {
			if (response) {
				handleReset();
				updateCard(response);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="cardName">Card Name:</label>
				<input
					type="text"
					name="cardName"
					placeholder="Credit Card"
					ref={cardName}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="expiresAt">Expires At:</label>
				<input
					type="date"
					name="expiresAt"
					placeholder=""
					ref={expiresAt}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="limit">Limit:</label>
				<input
					type="number"
					name="limit"
					ref={limit}
					className="input-text"
				/>
			</div>
			<button className="form-button" type="button" onClick={handleReset}>
				Reset
			</button>
			<button
				className="form-button"
				type="submit"
				onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
}

export default CreateCardForm;