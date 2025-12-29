import { useContext, useEffect, useState } from "react";

import { GetUserCreditCards } from "../../api/services/creditCardServices";

import AuthContext from "../../contexts/authContext";

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";
import CardSelect from "./cardSelect";

function UserCardsList() {
	const { user, updateCard } = useContext(AuthContext);
	const [cards, setCards] = useState<Array<CreditCardDTO>>([]);

	useEffect(() => {
		if (!user?.id) return;
		GetUserCreditCards(user.id).then((data) => {
			setCards(data);
		});
	}, [user]);

	const cardSelectionHandler = (card: CreditCardDTO) => {
		updateCard(card);
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
