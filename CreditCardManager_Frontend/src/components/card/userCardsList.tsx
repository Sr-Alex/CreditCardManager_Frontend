import { useEffect, useState } from "react";

import { GetUserCreditCards } from "../../api/services/creditCardServices";

import { useAuthContext } from '../../hooks/useAuthContext';

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";
import CardSelect from "./cardSelect";

function UserCardsList() {
	const { user, updateCard } = useAuthContext();
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
					key={card.id}
					card={card}
					clickHandler={() => cardSelectionHandler(card)}
				/>
			))}
		</ul>
	);
}

export default UserCardsList;
