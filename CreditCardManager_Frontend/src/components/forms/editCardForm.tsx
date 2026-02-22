import { useRef, useState, type FormEvent } from "react";

import { UpdateCreditCard } from "../../api/services/creditCardServices";

import type {
	CreditCardDTO,
	UpdateCreditCardDTO,
} from "../../api/dtos/creditCardDtos";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import ActionButton from "../actionButton";

function EditCardForm() {
	const { card, selectCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const cardName = useRef<HTMLInputElement>(null);
	const expiresAt = useRef<HTMLInputElement>(null);
	const limit = useRef<HTMLInputElement>(null);
	const invoice = useRef<HTMLInputElement>(null);

	const [isWaiting, setIsWaiting] = useState(false);

	const formattedDate = new Date(card?.expiresAt!).toISOString().slice(0, 10);

	const handleUpdate = async (event: FormEvent) => {
		event.preventDefault();
		if (!card) {
			closeModal();
			return;
		}

		setIsWaiting(true);

		const updatedCard: UpdateCreditCardDTO = {
			cardName: cardName.current?.value || card.cardName,
			expiresAt: expiresAt.current?.value || card.expiresAt,
			limit: limit.current?.value
				? Number(limit.current.value)
				: card.limit,
		};

		const response = await UpdateCreditCard(card.id, updatedCard);
		if (response.success) {
			selectCard(response.data as CreditCardDTO);
			closeModal();
		}

		setIsWaiting(false);
	};

	return (
		<form onSubmit={(e) => handleUpdate(e)}>
			<div>
				<label htmlFor="cardName">Nome do Cartão:</label>
				<input
					type="text"
					name="cardName"
					placeholder="Meu Cartão"
					maxLength={100}
					ref={cardName}
					defaultValue={card?.cardName || ""}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="expiresAt">Data de Validade:</label>
				<input
					type="date"
					name="expiresAt"
					ref={expiresAt}
					defaultValue={formattedDate}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="limit">Limite:</label>
				<input
					type="number"
					name="limit"
					placeholder="5000,00"
					min={0}
					max={999999}
					step={0.01}
					ref={limit}
					defaultValue={card?.limit?.toFixed(2) || ""}
					className="input-text"
				/>
			</div>

			<ActionButton type="submit" className="form-button">
				{isWaiting ? "Aguardando..." : "Editar"}
			</ActionButton>
		</form>
	);
}

export default EditCardForm;
