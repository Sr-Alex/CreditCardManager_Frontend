import { createContext } from "react";

import type { CardUserDTO } from "../api/dtos/cardUsersDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";
import type { DebtDTO } from "../api/dtos/debtsDTOs";

export interface CardContextImp {
	card: CreditCardDTO | undefined;
	setCard: (card: CreditCardDTO | undefined) => void;
	clearCard: () => void;
	updateCard: () => void;
	cardUsers: CardUserDTO[];
	updateCardUsers: () => void;
	debts: DebtDTO[];
	updateDebts: () => void;
}

const CardContext = createContext<CardContextImp>({
	card: undefined,
	setCard: () => {},
	clearCard: () => {},
	updateCard: () => {},
	cardUsers: [],
	updateCardUsers: () => {},
	debts: [],
	updateDebts: () => {},
});

export default CardContext;
