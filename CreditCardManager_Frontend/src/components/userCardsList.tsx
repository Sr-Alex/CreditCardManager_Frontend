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

	const cardSelectionHandler = (card: CreditCardDTO) => {
		context?.setCard(card);
	};

	return (
		<ul className="flex w-full gap-6">
			{cards.map((card) => (
				<CardSelect
					card={card}
					clickHandler={() => cardSelectionHandler(card)}
				/>
			))}
		</ul>
	);
}

export default UserCardsList;
