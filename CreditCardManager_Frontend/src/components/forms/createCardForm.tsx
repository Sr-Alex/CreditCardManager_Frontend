import { useRef, useState, type FormEvent } from "react";

import type {
	CreateCreditCardDTO,
	CreditCardDTO,
} from "../../api/dtos/creditCardDtos";
import { CreateCreditCard } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";
import useCardContext from "../../hooks/useCardContext";

import { formatCurrencyValue } from "../../utils/formatters";

import ActionButton from "../actionButton";
import useModalContext from "../../hooks/useModalContext";

function CreateCardForm() {
	const { user } = useAuthContext();
	const { setCard } = useCardContext();
	const { closeModal } = useModalContext();

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
				setCard(card);
				closeModal();
			}
		});

		setIsWaiting(false);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label
					title="Um nome para identificar seu cartão."
					htmlFor="cardName">
					Nome do cartão:
				</label>
				<input
					type="text"
					name="cardName"
					placeholder="Credit Card"
					ref={cardName}
					className="input-text"
				/>
			</div>
			<div>
				<label
					title="Data em que sua fatura expira."
					htmlFor="expiresAt">
					Data de expiração:
				</label>
				<input
					type="date"
					name="expiresAt"
					ref={expiresAt}
					className="input-text"
				/>
			</div>
			<div>
				<label title="Limite do cartão de crédito." htmlFor="limit">
					Limite:
				</label>
				<input
					type="number"
					name="limit"
					placeholder={formatCurrencyValue(500)}
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
				Limpar
			</ActionButton>
			<ActionButton
				disabled={isWaiting}
				className="form-button"
				type="submit">
				{isWaiting ? "Aguardando..." : "Criar"}
			</ActionButton>
		</form>
	);
}

export default CreateCardForm;
