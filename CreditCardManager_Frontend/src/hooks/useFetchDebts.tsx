import { useEffect, useState } from "react";

import { GetDebtHistory } from "../api/services/DebtServices";

import useAuthContext from "./useAuthContext";

import type { DebtDTO } from "../api/dtos/debtsDTOs";

function useFetchDebts() {
	const { isLogged, card } = useAuthContext();
	const [debts, setDebts] = useState<DebtDTO[]>([]);

	const fetchDebts = async () => {
		if (!card?.id) return;

		try {
			GetDebtHistory(card.id).then((response) => {
				if (response.success) {
					setDebts(response.data as DebtDTO[]);
				}
			});
		} catch (error) {
			setDebts([]);
		}
	};

	useEffect(() => {
		fetchDebts();
		return () => setDebts([]);
	}, [isLogged, card]);

	return debts;
}

export default useFetchDebts;
