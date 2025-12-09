import { CreditCard } from "lucide-react";

import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

interface CardSelectProps {
	card: CreditCardDTO;
	clickHandler: Function;
}

function CardSelect({ card, clickHandler }: CardSelectProps) {
	const formatter = Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		currency: "BRL",
	});

	return (
		<li
			className="flex flex-col items-center p-2 max-w-40 rounded-lg text-white bg-blue"
			style={{ cursor: "pointer" }}
			onClick={() => clickHandler(card.id)}>
			<div>
				<CreditCard size={"4rem"}/>
			</div>
			<div>
				<p className="text-center">
					{card.cardName}
				</p>
                <p className="text-center">
					{card?.invoice &&
						formatter.format(
							parseInt(card.invoice.replace(",", "."))
						)}
				</p>
				<p>
					Limite: R$
					{card?.limit &&
						formatter.format(
							parseInt(card.limit.replace(",", "."))
						)}
				</p>
			</div>
		</li>
	);
}

export default CardSelect;
