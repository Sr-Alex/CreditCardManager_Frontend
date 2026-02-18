import type { DebtDTO } from "../../api/dtos/debtsDTOs";
import Container from "../container";
import EditDebtForm from "../forms/editDebtForm";

function EditDebtFormContainer({ debtData }: { debtData: DebtDTO }) {
	return (
		<Container
			title="Atualize ou exclua uma dívida registrada!"
			className="modal"
			closeButton>
			<EditDebtForm debtData={debtData} />
		</Container>
	);
}

export default EditDebtFormContainer;
