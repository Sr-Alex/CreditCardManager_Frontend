import { useEffect, useState } from "react";

import { GetDebtHistory } from "../api/services/DebtServices";

import useAuthContext from "./useAuthContext";

import type { DebtDTO } from "../api/dtos/debtsDTOs";

function useFetchDebts() {
	const { isLogged, card } = useAuthContext();
	const [debts, setDebts] = useState<DebtDTO[]>([]);

	useEffect(() => {
		async function fetchDebts() {
			if (!card?.id) return;

			const response = await GetDebtHistory(card.id);
			if (response.success) {
				setDebts(response.data as DebtDTO[]);
			}
		}

		fetchDebts();

		return () => setDebts([]);
	}, [isLogged, card]);

	return debts;
}

export default useFetchDebts;
