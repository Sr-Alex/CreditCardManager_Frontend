import { useState } from "react";
import UserCardsList from "./userCardsList";
import { Plus } from "lucide-react";
import CreateCardForm from "./forms/createCardForm";
import Container from "./container";

const UserCardsSelect = () => {
	const [showCreated, setShowCreated] = useState(false);

	return (
		<Container Title={showCreated ? "Crie seu cartão!" : "Selecione um de seus cartões!"}>
			<button style={{display: "block", marginLeft: "auto"}} onClick={() => setShowCreated(!showCreated)}>
				<Plus
					size="1.5rem"
					style={{ color: "var(--color-dark-blue)" }}
				/>
			</button>

			{showCreated ? <CreateCardForm /> : <UserCardsList />}
		</Container>
	);
};

export default UserCardsSelect;
