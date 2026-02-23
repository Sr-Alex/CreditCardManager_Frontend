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
				className="flex flex-col items-center p-1 w-30 h-30 cursor-pointer rounded-lg text-white bg-blue"
				onClick={() => clickHandler(card.id)}>
				<div>
					<CreditCard size={"2.5rem"} />
				</div>
				<div className="w-full text-sm text-center">
					<p
						title={card.cardName}
						className="overflow-hidden text-ellipsis text-nowrap">
						{card.cardName}
					</p>
					<p className="font-bold">{formattedInvoice}</p>
					<p>{formattedLimit}</p>
				</div>
			</ActionButton>
		</li>
	);
}

export default CardSelect;
