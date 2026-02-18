import Container from "../container";
import DebtForm from "../forms/debtForm";
import ModalContainer from "../modalContainer";

function DebtFormContainer() {
	return (
		<ModalContainer>
			<Container
				title="Registre sua dívida:"
				className="modal"
				closeButton>
				<DebtForm />
			</Container>
		</ModalContainer>
	);
}

export default DebtFormContainer;
