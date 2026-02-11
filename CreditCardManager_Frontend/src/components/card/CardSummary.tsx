import { useState } from "react";

import useAuthContext from "../../hooks/useAuthContext";

import {
	formatCurrencyValue,
	formatDateToString,
} from "../../utils/formatters";

import Container from "../container";
import CardDefinitions from "./cardDefinitions";
import AbsoluteContainer from "../absoluteContainer";

function CardSummary() {
	const { card } = useAuthContext();
	const [showCardDefinitions, setShowCardDefinitions] =
		useState<boolean>(false);

	const formattedInvoice = formatCurrencyValue(card?.invoice || NaN);
	const formattedLimit = formatCurrencyValue(card?.limit || NaN);
	const formattedDate = formatDateToString(
		card ? new Date(card!.expiresAt) : new Date(),
	);

	return (
		<Container
			title={card?.cardName}
			backgroundColor="bg-blue hover:bg-dark-gray dark:hover:bg-dark-slate"
			textColor="text-white"
			className="w-full h-fit transition-colors ease-in-out">
			<button
				onClick={() => setShowCardDefinitions(true)}
				className="block w-full text-left cursor-pointer">
				<h2>{formattedInvoice}</h2>
				<div className="mt-2 text-sm">
					<p>Limite: {formattedLimit}</p>
					<p>Expira em: {formattedDate} </p>
				</div>
			</button>

			{showCardDefinitions && (
				<AbsoluteContainer>
					<CardDefinitions
						CardDefinitionsHandler={() =>
							setShowCardDefinitions(false)
						}
					/>
				</AbsoluteContainer>
			)}
		</Container>
	);
}

export default CardSummary;
