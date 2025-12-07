import { useContext, useEffect, useState } from "react";

import { GetUserCreditCards } from "../api/services/creditCardServices";

import LoginContext from "../contexts/loginContext";

import type { CreditCardDTO } from "../api/dtos/creditCardDtos";
import CardSelect from "./cardSelect";

function UserCardsList() {
	const context = useContext(LoginContext);
	const [cards, setCards] = useState<Array<CreditCardDTO>>([]);

	useEffect(() => {
		if (!context?.user?.id) return;
		GetUserCreditCards(context.user.id).then((data) => {
			setCards(data);
		});
	}, [context?.user]);

	const cardSelectionHandler = (cardId: number) => {
		context?.setCardId(cardId);
	};

	return (
		<ul>
			{cards.map((card) => (
				<CardSelect card={card} clickHandler={cardSelectionHandler} />
			))}
		</ul>
	);
}

export default UserCardsList;
