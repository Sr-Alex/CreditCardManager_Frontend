import { useContext, useEffect, useState } from "react";

import { GetUserCreditCards } from "../api/services/creditCardServices";

import LoginContext from "../contexts/loginContext";

import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

function UserCardsList() {
	const context = useContext(LoginContext);
	const [cards, setCards] = useState<Array<CreditCardDTO>>([]);

	useEffect(() => {
		if (!context?.user?.Id) return;
		GetUserCreditCards(context.user.Id).then((data) => {
			setCards(data);
		});
	}, []);

	return (
		<ul>
			{cards.map((card) => (
				<li key={card.id}>{card.cardName}</li>
			))}
		</ul>
	);
}

export default UserCardsList;
