import { useEffect, useState } from "react";

import type { CardUserDTO } from "../api/dtos/cardUsersDtos";
import useAuthContext from "./useAuthContext";
import { GetCreditCardUsers } from "../api/services/creditCardServices";

function useFetchCardUsers() {
	const { card } = useAuthContext();
	const [cardUsers, setCardUsers] = useState<CardUserDTO[]>([]);

	useEffect(() => {
		async function fetchCardUser() {
			if (!card?.id) return;

			const response = await GetCreditCardUsers(card.id);
			if (response.success) {
				setCardUsers(response.data! as CardUserDTO[]);
			}
		}

		fetchCardUser();

		return () => setCardUsers([]);
	}, [card]);

	return cardUsers;
}

export default useFetchCardUsers;
