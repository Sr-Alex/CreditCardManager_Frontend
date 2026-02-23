import { useState } from "react";

import { Plus } from "lucide-react";

import Container from "../container";
import UserCardsList from "./userCardsList";
import CreateCardForm from "../auth/createCardForm";

import ActionButton from "../actionButton";

const UserCardsListContainer = () => {
	const [showCreated, setShowCreated] = useState(false);

	return (
		<Container
			title={
				showCreated
					? "Crie seu cartão!"
					: "Selecione um de seus cartões!"
			}
			closeButton
			className="modal
			">
			<ActionButton
				onClick={() => setShowCreated(!showCreated)}
				className="mb-2 form-button rounded-lg font-medium">
				<Plus
					className="transition-all duration-100 ease-in-out"
					style={{ rotate: showCreated ? "45deg" : "0deg" }}
				/>
			</ActionButton>
			{showCreated ? <CreateCardForm /> : <UserCardsList />}
		</Container>
	);
};

export default UserCardsListContainer;
