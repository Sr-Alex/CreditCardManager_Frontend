import { useState } from "react";

import { Plus } from "lucide-react";

import Container from "../container";
import UserCardsList from "./userCardsList";
import CreateCardForm from "../forms/createCardForm";

import ActionButton from "../actionButton";

const UserCardsSelect = () => {
	const [showCreated, setShowCreated] = useState(false);

	return (
		<Container
			title={
				showCreated
					? "Crie seu cartão!"
					: "Selecione um de seus cartões!"
			}>
			<ActionButton
				onClick={() => setShowCreated(!showCreated)}
				className="w-fit mb-2 px-4 py-2 rounded-lg font-medium">
				<Plus
					className="transition-all duration-100 ease-in-out"
					style={{ rotate: showCreated ? "45deg" : "0deg" }}
				/>
			</ActionButton>
			{showCreated ? <CreateCardForm /> : <UserCardsList />}
		</Container>
	);
};

export default UserCardsSelect;
