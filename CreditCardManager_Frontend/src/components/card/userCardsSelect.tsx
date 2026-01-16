import { useState } from "react";
import UserCardsList from "./userCardsList";
import { Plus } from "lucide-react";
import CreateCardForm from "../forms/createCardForm";
import Container from "../container";

const UserCardsSelect = () => {
	const [showCreated, setShowCreated] = useState(false);

	return (
		<Container
			title={
				showCreated
					? "Crie seu cartão!"
					: "Selecione um de seus cartões!"
			}>
			<button
				onClick={() => setShowCreated(!showCreated)}
				className="w-fit mb-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-dark-blue transition-colors font-medium">
				<Plus
					className="transition-all duration-100 ease-in-out"
					style={{ rotate: showCreated ? "45deg" : "0deg" }}
				/>
			</button>
			{showCreated ? <CreateCardForm /> : <UserCardsList />}
		</Container>
	);
};

export default UserCardsSelect;
