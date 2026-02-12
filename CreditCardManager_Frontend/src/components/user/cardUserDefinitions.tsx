import { User } from "lucide-react";

import type {
	CardUserDTO,
	RemoveCardUserDTO,
} from "../../api/dtos/cardUsersDtos";

import Container from "../container";
import ActionButton from "../actionButton";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import { RemoveCardUser } from "../../api/services/creditCardServices";

interface CardUserDefinitionsProps {
	cardUserData: CardUserDTO;
	handleCardUserDefinitions?: () => void;
}

function CardUserDefinitions({
	cardUserData,
	handleCardUserDefinitions = () => {},
}: CardUserDefinitionsProps) {
	const { user, card, updateCard } = useAuthContext();
	const [isWaiting, setIsWaiting] = useState<boolean>(false);

	const handleDeleteCardUser = async () => {
		if (user?.id != card?.userId || !card?.id) return;

		setIsWaiting(true);

		const removeCardUserDTO: RemoveCardUserDTO = {
			cardUserId: cardUserData.id,
		};

		const response = await RemoveCardUser(card?.id, removeCardUserDTO);
		if (response.success) {
			updateCard();
			handleCardUserDefinitions();
		}
		setIsWaiting(false);
	};

	return (
		<Container
			title="Usuário do cartão:"
			closeButton
			closeButtonHandler={() => handleCardUserDefinitions()}>
			<figure className="text-center mb-4">
				<User className="mx-auto mb-2" size={"4rem"} />
				<p className="font-bold">{cardUserData.userName}</p>
			</figure>
			<div className="mb-6">
				<div className="text-center">
					<p className="input-text">
						Total de registros:{" "}
						<span className="font-bold">
							{cardUserData.debtsCount}
						</span>
					</p>
				</div>
				<div className="text-center">
					<p className="input-text">
						Dívidas Pendentes:{" "}
						<span className="font-bold text-red">
							{cardUserData.pendingDebts}
						</span>
					</p>
				</div>
			</div>
			<ActionButton
				onClick={handleDeleteCardUser}
				disabled={isWaiting}
				backgroundColor="bg-red"
				className="p-2 rounded-lg">
				Remove
			</ActionButton>
		</Container>
	);
}

export default CardUserDefinitions;
