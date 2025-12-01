import { useContext, useRef } from "react";

import type { CreateCreditCardDTO } from "../../api/dtos/creditCardDtos";
import { CreateCreditCard } from "../../api/services/creditCardServices";
import LoginContext from "../../contexts/loginContext";

function CreateCardForm() {
	const context = useContext(LoginContext);

	const cardName = useRef<HTMLInputElement>(null);
	const expiresAt = useRef<HTMLInputElement>(null);
	const limit = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		cardName.current!.value = "";
		expiresAt.current!.value = "";
		limit.current!.value = "";
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (context?.user?.Id) return;

		const createCard: CreateCreditCardDTO = {
			userId: Number(context?.user?.Id),
			cardName: cardName.current!.value || undefined,
			expiresAt: expiresAt.current!.value || undefined,
			Limit: limit.current!.value || undefined,
		};

		CreateCreditCard(createCard);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="cardName">Card Name:</label>
				<input id="cardName" type="text" ref={cardName} />
			</div>
			<div>
				<label htmlFor="expiresAt">Expires At:</label>
				<input id="expiresAt" type="text" ref={expiresAt} />
			</div>
			<div>
				<label htmlFor="limit">Limit:</label>
				<input id="limit" type="number" ref={limit} />
			</div>
			<button type="button" onClick={handleReset}>
				Reset
			</button>
			<button type="submit">Submit</button>
		</form>
	);
}

export default CreateCardForm;
