import { CreditCard } from "lucide-react";

import { formatCurrencyValue } from "../../utils/formatters";

import type { CreditCardDTO } from "../../api/dtos/creditCardDtos";
import ActionButton from "../actionButton";

interface CardSelectProps {
	card: CreditCardDTO;
	clickHandler: (cardId: number) => void;
}

function CardSelect({ card, clickHandler }: CardSelectProps) {
	const formattedInvoice = formatCurrencyValue(Number(card.invoice));
	const formattedLimit = formatCurrencyValue(Number(card.limit));

	return (
		<li>
			<ActionButton
				className="flex flex-col items-center p-2 w-36 cursor-pointer rounded-lg text-white bg-blue"
				onClick={() => clickHandler(card.id)}>
				<div>
					<CreditCard size={"4rem"} />
				</div>
				<div>
					<p className="text-center">{card.cardName}</p>
					<p className="text-center">{formattedInvoice}</p>
					<p>Limite: {formattedLimit}</p>
				</div>
			</ActionButton>
		</li>
	);
}

export default CardSelect;
