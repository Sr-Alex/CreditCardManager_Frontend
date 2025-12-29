import { useContext, useEffect, useRef } from "react";
import Container from "../container";
import AuthContext from "../../contexts/authContext";

function CardSummary() {
	const context = useContext(AuthContext);
	const invoiceRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (invoiceRef.current && context?.card?.invoice) {
			invoiceRef.current.innerText = context?.card?.invoice?.toString();
		}
	}, [context?.card]);

	return (
		<Container Title="Total da Fatura" ClassName="bg-blue text-white">
			<h2>
				R$ <span ref={invoiceRef}></span>
			</h2>
		</Container>
	);
}

export default CardSummary;
