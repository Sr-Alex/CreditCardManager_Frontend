import { useEffect, useState } from "react";

import { GetUserCreditCards } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";
import CardSelect from "./cardSelect";

function UserCardsList() {
	const { user, isLogged, logout, selectCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const [cards, setCards] = useState<CreditCardDTO[]>([]);

	useEffect(() => {
		if (!isLogged || !user?.id) {
			logout();
			return;
		}

		GetUserCreditCards(user.id).then((response) => {
			if (response.success) {
				setCards(response.data as CreditCardDTO[]);
			} else {
				logout();
			}
		});
	}, [isLogged, user, logout]);

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
