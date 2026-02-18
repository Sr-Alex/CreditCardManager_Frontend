import Container from "../container";
import AddUserForm from "../forms/addUserForm";

function AddUserFormContainer() {
	return (
		<Container
			title="Adicionar usuário ao cartão: "
			className="modal"
			closeButton>
			<AddUserForm />
		</Container>
	);
}

export default AddUserFormContainer;
