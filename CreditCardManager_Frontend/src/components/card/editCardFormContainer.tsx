import Container from "../container";
import EditCardForm from "../forms/editCardForm";

function EditCardFormContainer() {
	return (
		<Container title="Registre sua dívida:" className="modal" closeButton>
			<EditCardForm />
		</Container>
	);
}
export default EditCardFormContainer;
