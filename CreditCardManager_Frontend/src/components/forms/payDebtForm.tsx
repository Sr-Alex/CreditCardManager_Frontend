import { useEffect, useState, type FormEvent } from "react";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import { payDebt } from "../../api/services/DebtServices";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";
import type { UserDTO } from "../../api/dtos/userDtos";

import ActionButton from "../actionButton";
import { GetUser } from "../../api/services/userServices";
import {
	formatCurrencyValue,
	formatDateToString,
} from "../../utils/formatters";
import { User } from "lucide-react";

function PayDebtForm({ debtData }: { debtData: DebtDTO }) {
	const { user, card, updateCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const [isWaiting, setIsWaiting] = useState(false);
	const [debtOwner, setDebtOwner] = useState<UserDTO>();

	const formattedValue = formatCurrencyValue(debtData.value);
	const formattedDate = formatDateToString(new Date(debtData.date));

	const pay = async (event: FormEvent) => {
		event.preventDefault();

		if (!(user?.id == debtData.user) || !(user?.id == card?.userId)) {
			closeModal();
		}

		setIsWaiting(true);

		const response = await payDebt(debtData.id);
		if (response.success) {
			updateCard();
			closeModal();
		}

		setIsWaiting(false);
	};

	useEffect(() => {
		const getOwner = async () => {
			const response = await GetUser(debtData.user);
			if (!response.success) return;

			setDebtOwner(response.data as UserDTO);
		};

		getOwner();
	}, [debtData]);

	return (
		<form onSubmit={(e) => pay(e)}>
			<div className="w-full mb-6 text-center">
				<h2 className="text-lg font-bold">{debtData.label}</h2>

				<div className="mt-4 mb-2">
					<figure>
						<User className="mx-auto" size={"4rem"} />
					</figure>
					<p className="font-bold">{debtOwner?.userName}</p>
				</div>
				<p className="input-text font-bold">{formattedValue}</p>
				<p className="input-text font-bold">{formattedDate}</p>
			</div>
			<ActionButton
				type="submit"
				disabled={isWaiting}
				className="p-2 rounded-xl">
				Pagar dívida
			</ActionButton>
		</form>
	);
}

export default PayDebtForm;
