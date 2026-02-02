import { useState } from "react";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";

import useAuthContext from "../../hooks/useAuthContext";

import useFetchDebts from "../../hooks/useFetchDebts";

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

	const debts = useFetchDebts();

	const [showDebtForm, setShowDebtForm] = useState(false);

	const isOwner = (debt: DebtDTO) => {
		return user?.id == debt.user || user?.id == card?.userId;
	};

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
							handleCreateForm={() => {
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
