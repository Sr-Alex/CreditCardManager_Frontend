import { useEffect } from "react";

import useCardContext from "./useCardContext";

function useFetchCardUsers() {
	const { card, updateCardUsers, cardUsers } = useCardContext();

	useEffect(() => {
		updateCardUsers();
	}, [card]);

	return cardUsers;
}

export default useFetchCardUsers;
