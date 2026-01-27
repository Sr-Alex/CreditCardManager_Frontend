import { useEffect, useRef } from "react";
import Container from "../container";
import { useAuthContext } from '../../hooks/useAuthContext';

function CardSummary() {
	const context = useAuthContext();
	const invoiceRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (invoiceRef.current && context?.card?.invoice) {
			invoiceRef.current.innerText = context?.card?.invoice?.toString();
		}
	}, [context?.card]);

	return (
		<Container
			title="Total da Fatura"
			backgroundColor="bg-blue"
			textColor="text-white">
			<h2>
				R$ <span ref={invoiceRef}></span>
			</h2>
		</Container>
	);
}

export default CardSummary;
