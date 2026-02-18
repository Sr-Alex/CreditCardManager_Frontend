import { CreditCard } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";

import {
	formatCurrencyValue,
	formatDateToString,
} from "../../utils/formatters";

import Container from "../container";

function CardDefinitions() {
	const { card } = useAuthContext();

	const formattedInvoice = formatCurrencyValue(card?.invoice || NaN);
	const formattedLimit = formatCurrencyValue(card?.limit || NaN);
	const formattedDate = formatDateToString(
		card ? new Date(card!.expiresAt) : new Date(),
	);

	return (
		<Container title="Dados do cartão:" closeButton className="modal">
			<figure className="w-full">
				<CreditCard className="mx-auto mb-4" size={"4rem"} />
			</figure>
			<div className="mb-6">
				<div>
					<p className="input-text text-center font-bold">
						{card?.cardName}
					</p>
					<p className="input-text">
						Fatura atual:{" "}
						<span className="font-bold">{formattedInvoice}</span>
					</p>
					<p className="input-text">
						Limite atual:{" "}
						<span className="font-bold">{formattedLimit}</span>
					</p>
					<p className="input-text">
						Data de expiração:{" "}
						<span className="font-bold">{formattedDate}</span>
					</p>
				</div>
			</div>
		</Container>
	);
}

export default CardDefinitions;
