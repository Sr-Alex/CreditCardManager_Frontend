import Container from "../container";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatCurrencyValue } from "../../utils/formatters";

function CardSummary() {
	const { card } = useAuthContext();

	const formattedInvoice = formatCurrencyValue(card?.invoice || NaN);

	return (
		<Container
			title="Total da Fatura"
			backgroundColor="bg-blue"
			textColor="text-white">
			<h2>{formattedInvoice}</h2>
		</Container>
	);
}

export default CardSummary;
