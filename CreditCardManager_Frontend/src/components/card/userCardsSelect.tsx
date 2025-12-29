import { useState } from "react";
import UserCardsList from "./userCardsList";
import { Plus } from "lucide-react";
import CreateCardForm from "../forms/createCardForm";
import Container from "../container";

const UserCardsSelect = () => {
	const [showCreated, setShowCreated] = useState(false);

	return (
		<Container
			Title={
				showCreated
					? "Crie seu cartão!"
					: "Selecione um de seus cartões!"
			}>
			<button
				type="button"
				onClick={() => setShowCreated(!showCreated)}
				className="block ml-auto mb-2 cursor-pointer">
				<Plus
					size="2rem"
					className={`text-dark-slate transition-all duration-100 ease-in-out`}
					style={{rotate : showCreated ? "45deg" : "0deg"}}
				/>
			</button>

			{showCreated ? <CreateCardForm /> : <UserCardsList />}
		</Container>
	);
};

export default UserCardsSelect;
