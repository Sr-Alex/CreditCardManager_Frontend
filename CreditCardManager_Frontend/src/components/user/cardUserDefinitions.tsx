import { useState } from "react";
import { User } from "lucide-react";

import { RemoveCardUser } from "../../api/services/creditCardServices";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import type {
	CardUserDTO,
	RemoveCardUserDTO,
} from "../../api/dtos/cardUsersDtos";

import { formatCurrencyValue } from "../../utils/formatters";

import Container from "../container";
import ActionButton from "../actionButton";

function CardUserDefinitions({ cardUser }: { cardUser: CardUserDTO }) {
	const { user, card, updateCard } = useAuthContext();
	const { closeModal } = useModalContext();

	const [isWaiting, setIsWaiting] = useState<boolean>(false);

	const formattedTotalAmount = formatCurrencyValue(cardUser.totalAmount);
	const formattedAmountToPay = formatCurrencyValue(cardUser.amountToPay);

	const handleDeleteCardUser = async () => {
		if (user?.id != card?.userId || !card?.id) return;

		setIsWaiting(true);

		const removeCardUserDTO: RemoveCardUserDTO = {
			cardUserId: cardUser.id,
		};

		const response = await RemoveCardUser(card?.id, removeCardUserDTO);
		if (response.success) {
			updateCard();
			closeModal();
		}
		setIsWaiting(false);
	};

	return (
		<Container title="Usuário do cartão:" className="modal" closeButton>
			<figure className="text-center mb-4">
				<User className="mx-auto mb-2" size={"4rem"} />
				<p className="font-bold">
					{cardUser.userName.length > 50
						? cardUser.userName.slice(0, 50) + "..."
						: cardUser.userName}
				</p>
			</figure>
			<div className="mb-6">
				<div className="text-center">
					<p className="input-text">
						Total de registros:{" "}
						<span className="font-bold">{cardUser.debtsCount}</span>
					</p>
				</div>
				<div className="text-center">
					<p className="input-text">
						Dívidas Pendentes:{" "}
						<span className="font-bold text-red">
							{cardUser.pendingDebts}
						</span>
					</p>
				</div>
				<div className="text-center">
					<p className="input-text">
						Quantia total:{" "}
						<span className="font-bold">
							{formattedTotalAmount}
						</span>
					</p>
				</div>
				<div className="text-center">
					<p className="input-text">
						Quantia à pagar:{" "}
						<span className="font-bold text-red">
							{formattedAmountToPay}
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
