import { useEffect, useState } from "react";

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";

import { GetUserCreditCards } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";
import useCardContext from "../../hooks/useCardContext";
import useModalContext from "../../hooks/useModalContext";

import CardSelect from "./cardSelect";
import AuthFormContainer from "../auth/authFormContainer";

function UserCardsList() {
	const { user, logout } = useAuthContext();
	const { setCard } = useCardContext();
	const { closeModal, openModal } = useModalContext();

	const [cards, setCards] = useState<CreditCardDTO[]>([]);

	useEffect(() => {
		const fetchCards = async () => {
			if (user != undefined) {
				const response = await GetUserCreditCards(user.id);
				if (response.success) {
					setCards(response.data as CreditCardDTO[]);
				} else {
					logout();
					openModal(<AuthFormContainer />);
				}
			}
		};

		fetchCards();
	}, [user]);

	const cardSelectionHandler = (card: CreditCardDTO) => {
		setCard(card);
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
