import { useEffect, useState } from "react";

import { GetUserCreditCards } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";
import CardSelect from "./cardSelect";

function UserCardsList() {
	const { user, selectCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const [cards, setCards] = useState<CreditCardDTO[]>([]);

	useEffect(() => {
		const fetchCards = async () => {
			if (user) {
				const response = await GetUserCreditCards(user.id);
				if (response.success) {
					setCards(response.data as CreditCardDTO[]);
				}
			}
		};

		fetchCards();
	}, [user, setCards]);

	const cardSelectionHandler = (card: CreditCardDTO) => {
		selectCard(card);
		closeModal();
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
