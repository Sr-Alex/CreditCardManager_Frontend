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
			className="cardSelect rounded flex flex-column flex-center"
			style={{ cursor: "pointer" }}
			onClick={() => clickHandler(card.id)}>
			<div>
				<CreditCard size={"4rem"} style={{ color: "white" }} />
			</div>
			<div>
				<p style={{ textAlign: "center", margin: "0 0 0.5rem 0" }}>
					{card.cardName}
				</p>
                <p style={{ textAlign: "center" }}>
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
