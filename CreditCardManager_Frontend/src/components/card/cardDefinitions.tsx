import { useState } from "react";
import { CreditCard, SquarePen } from "lucide-react";

import { DeleteCreditCard } from "../../api/services/creditCardServices";

import useCardContext from "../../hooks/useCardContext";
import useModalContext from "../../hooks/useModalContext";

import {
	formatCurrencyValue,
	formatDateToString,
} from "../../utils/formatters";

import Container from "../container";
import ActionButton from "../actionButton";
import ConfirmModal from "../confirmModal";
import UserCardsListContainer from "./userCardsListContainer";
import EditCardFormContainer from "./editCardFormContainer";

function CardDefinitions() {
	const { card, setCard, clearCard } = useCardContext();
	const { openModal, closeModal } = useModalContext();

	const [isWaiting, setIsWaiting] = useState<boolean>(false);

	const formattedInvoice = formatCurrencyValue(card?.invoice || 0);
	const formattedLimit = formatCurrencyValue(card?.limit || 0);
	const formattedDate = formatDateToString(
		card ? new Date(card!.expiresAt) : new Date(),
	);

	const handleDelete = async () => {
		if (!card?.id) return;

		const response = await DeleteCreditCard(card?.id);
		if (response.success) {
			setCard(undefined);
			clearCard();
			closeModal();
			openModal(<UserCardsListContainer />);
		}
	};

	const handleEditClick = () => {
		openModal(<EditCardFormContainer />);
	};

	const handleLeaveClick = () => {
		setCard(undefined);
		openModal(<UserCardsListContainer />);
	};

	const handleDeleteClick = async () => {
		setIsWaiting(true);
		openModal(<ConfirmModal onConfirm={handleDelete} />);
		setIsWaiting(false);
	};

	return (
		<Container title="Dados do cartão:" closeButton className="modal">
			<button
				onClick={handleEditClick}
				className="block ml-auto cursor-pointer">
				<SquarePen size={"1.5rem"} />
			</button>
			<figure className="w-full">
				<CreditCard className="mx-auto mb-4" size={"4rem"} />
			</figure>
			<div className="mb-6">
				<div>
					<p className="input-text text-center font-bold">
						{card?.cardName}
					</p>
					<p className="input-text">
						Fatura atual: <strong>{formattedInvoice}</strong>
					</p>
					<p className="input-text">
						Limite atual: <strong>{formattedLimit}</strong>
					</p>
					<p className="input-text">
						Data de expiração: <strong>{formattedDate}</strong>
					</p>
				</div>
			</div>

			<ActionButton
				onClick={handleLeaveClick}
				className="form-button px-2">
				Trocar cartão
			</ActionButton>

			{card && (
				<ActionButton
					onClick={handleDeleteClick}
					disabled={isWaiting}
					className="form-button px-2"
					backgroundColor="bg-red hover:bg-dark-red disabled:bg-gray">
					Apagar cartão
				</ActionButton>
			)}
		</Container>
	);
}

export default CardDefinitions;
