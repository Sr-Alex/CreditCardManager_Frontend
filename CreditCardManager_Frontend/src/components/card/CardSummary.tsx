import useCardContext from "../../hooks/useCardContext";
import useModalContext from "../../hooks/useModalContext";

import {
	formatCurrencyValue,
	formatDateToString,
} from "../../utils/formatters";

import Container from "../container";
import CardDefinitions from "./cardDefinitions";

function CardSummary() {
	const { card } = useCardContext();
	const { openModal } = useModalContext();

	const formattedInvoice: string = formatCurrencyValue(card?.invoice || 0);
	const formattedLimit: string = formatCurrencyValue(card?.limit || 0);
	const formattedDate: string = formatDateToString(
		card ? new Date(card!.expiresAt) : new Date(),
	);

	const handleClick = () => {
		openModal(<CardDefinitions />);
	};

	return (
		<Container
			title={card?.cardName}
			backgroundColor="bg-blue hover:bg-dark-gray dark:hover:bg-dark-slate"
			textColor="text-white"
			className="w-full h-fit transition-colors ease-in-out md:min-h-48">
			<button
				onClick={handleClick}
				className="block w-full h-full text-left cursor-pointer">
				<h2
					className={
						card != undefined && card.invoice > card.limit
							? "text-red"
							: "text-white"
					}>
					{formattedInvoice}
				</h2>
				<div className="mt-2 text-sm">
					<p>Limite: {formattedLimit}</p>
					<p>Expira em: {formattedDate} </p>
				</div>
			</button>
		</Container>
	);
}

export default CardSummary;
