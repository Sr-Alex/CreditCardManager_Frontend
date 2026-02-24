import { useState } from "react";

import CardContext from "./cardContext";

import type { CreditCardDTO } from "../api/dtos/creditCardDtos";
import type { CardUserDTO } from "../api/dtos/cardUsersDtos";
import type { DebtDTO } from "../api/dtos/debtsDTOs";

import {
	GetCreditCard,
	GetCreditCardUsers,
} from "../api/services/creditCardServices";
import { GetDebtHistory } from "../api/services/DebtServices";

function CardContextProvider({ children }: { children: React.ReactNode }) {
	const [card, setCard] = useState<CreditCardDTO | undefined>(undefined);
	const [cardUsers, setCardUsers] = useState<CardUserDTO[]>([]);
	const [debts, setDebts] = useState<DebtDTO[]>([]);

	const clearCard = () => {
		setCard(undefined);
		setCardUsers([]);
		setDebts([]);
	};

	const updateCard = async () => {
		if (!card?.id) return;

		const response = await GetCreditCard(card.id);

		if (response.success) {
			setCard(response.data as CreditCardDTO);
		}
	};

	const fetchDebts = async () => {
		if (!card?.id) return;

		const response = await GetDebtHistory(card.id);
		if (response.success) {
			setDebts(response.data as DebtDTO[]);
		}
	};

	const fetchCardUsers = async () => {
		if (!card?.id) return;

		const response = await GetCreditCardUsers(card.id);
		if (response.success) {
			setCardUsers(response.data as CardUserDTO[]);
		}
	};

	const values = {
		card,
		setCard,
		clearCard,
		updateCard,
		cardUsers,
		updateCardUsers: fetchCardUsers,
		debts,
		updateDebts: fetchDebts,
	};
	return <CardContext value={values}>{children}</CardContext>;
}

export default CardContextProvider;
