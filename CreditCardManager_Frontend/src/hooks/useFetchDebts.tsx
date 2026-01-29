import { useEffect, useState } from "react";

import { GetDebtHistory } from "../api/services/DebtServices";

import { useAuthContext } from "./useAuthContext";

import type { DebtDTO } from "../api/dtos/debtsDTOs";

function useFetchDebts() {
	const { isLogged, card } = useAuthContext();
	const [debts, setDebts] = useState<DebtDTO[]>([]);

	const fetchDebts = async () => {
		if (!card?.id) return;

		try {
			const debts = await GetDebtHistory(card.id);
			setDebts(debts);
		} catch (error) {
			setDebts([]);
			console.error(error);
		}
	};

	useEffect(() => {
		fetchDebts();
		return () => setDebts([]);
	}, [isLogged, card]);

	return debts;
}

export default useFetchDebts;
