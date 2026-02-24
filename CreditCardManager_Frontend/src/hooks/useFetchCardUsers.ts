import { useEffect } from "react";

import useCardContext from "./useCardContext";

function useFetchCardUsers() {
	const { card, updateCardUsers, cardUsers } = useCardContext();

	useEffect(() => {
		if (card) updateCardUsers();
	}, [card]);

	return cardUsers;
}

export default useFetchCardUsers;
