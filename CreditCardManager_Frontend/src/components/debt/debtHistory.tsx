import { useEffect, useState } from "react";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";
import { GetDebtHistory } from "../../api/services/DebtServices";

import { useAuthContext } from "../../hooks/useAuthContext";

import DebtShowData from "./debtShowData";
import AbsoluteContainer from "../absoluteContainer";
import Container from "../container";
import DebtForm from "../forms/debtForm";
import ActionButton from "../actionButton";
interface DebtHistoryProps {
	title?: string;
	description?: string;
}

function DebtHistory({
	title = "Histórico de Dívidas",
	description = "Visualize e gerencie suas dívidas",
}: DebtHistoryProps) {
	const { card, user } = useAuthContext();
	const [debts, setDebts] = useState<DebtDTO[]>([]);
	const [showDebtForm, setShowDebtForm] = useState(false);

	const isOwner = (debt: DebtDTO) => {
		return user?.id == debt.user || user?.id == card?.userId;
	};

	const getDebts = () => {
		if (!card) return;

		GetDebtHistory(card.id).then((data) => {
			setDebts(data);
		});
	};

	useEffect(() => {
		getDebts();
	}, [card, user]);

	return (
		<Container title={title} description={description}>
			<ul>
				{debts.length > 0 &&
					debts.map((debt, index) => (
						<DebtShowData
							key={index}
							debtData={debt}
							editable={isOwner(debt)}
							payable={isOwner(debt)}
						/>
					))}
			</ul>

			<ActionButton
				onClick={() => setShowDebtForm(true)}
				className="w-full mt-4 px-4 py-2 rounded-lg hover:bg-dark-blue transition-colors font-medium">
				+ Adicionar Dívida
			</ActionButton>

			{showDebtForm && card && (
				<AbsoluteContainer>
					<Container
						title="Registre sua dívida:"
						closeButton
						closeButtonHandler={() =>
							setShowDebtForm(!showDebtForm)
						}>
						<DebtForm
							handleSubmit={() => {
								getDebts();
								setShowDebtForm(false);
							}}
						/>
					</Container>
				</AbsoluteContainer>
			)}
		</Container>
	);
}

export default DebtHistory;
