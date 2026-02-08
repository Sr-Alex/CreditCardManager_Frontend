import { useRef, useState, type FormEvent } from "react";

import useAuthContext from "../../hooks/useAuthContext";

import { CreateCreditCard } from "../../api/services/creditCardServices";
import type {
	CreateCreditCardDTO,
	CreditCardDTO,
} from "../../api/dtos/creditCardDtos";

import ActionButton from "../actionButton";

function CreateCardForm() {
	const { selectCard, user } = useAuthContext();

	const cardName = useRef<HTMLInputElement>(null);
	const expiresAt = useRef<HTMLInputElement>(null);
	const limit = useRef<HTMLInputElement>(null);

	const [isWaiting, setIsWaiting] = useState(false);

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

		setIsWaiting(true);

		const createCard: CreateCreditCardDTO = {
			userId: Number(user.id),
			cardName: cardName.current?.value || undefined,
			expiresAt: expiresAt.current?.value || undefined,
			Limit: Number(limit.current?.value) || undefined,
		};

		CreateCreditCard(createCard).then((response) => {
			if (response.success) {
				const card = response.data as CreditCardDTO;
				handleReset();
				selectCard(card);
			}
		});

		setIsWaiting(false);
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
					min={0}
					max={999999}
					step={0.01}
					ref={limit}
					className="input-text"
				/>
			</div>
			<ActionButton
				className="form-button"
				type="button"
				onClick={handleReset}>
				Reset
			</ActionButton>
			<ActionButton
				disabled={isWaiting}
				className="form-button"
				type="submit">
				{isWaiting ? "Waiting" : "Submit"}
			</ActionButton>
		</form>
	);
}

export default CreateCardForm;
