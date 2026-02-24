import { useEffect } from "react";

import useCardContext from "./useCardContext";

function useFetchDebts() {
	const { card, debts, updateDebts } = useCardContext();

	useEffect(() => {
		if (card) updateDebts();
	}, [card]);

	return debts;
}

export default useFetchDebts;
