import type { DebtDTO } from "../../api/dtos/debtsDTOs";

import Container from "../container";
import ModalContainer from "../modalContainer";
import PayDebtForm from "../forms/payDebtForm";

function PayDebtFormContainer({ debtData }: { debtData: DebtDTO }) {
	return (
		<ModalContainer>
			<Container
				title="Registre a dívida paga!"
				closeButton
				className="modal">
				<PayDebtForm debtData={debtData} />
			</Container>
		</ModalContainer>
	);
}

export default PayDebtFormContainer;
