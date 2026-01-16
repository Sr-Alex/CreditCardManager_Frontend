import { useEffect, useState } from "react";

import { useAuthContext } from "../../contexts/authContext";

import { GetDebtHistory } from "../../api/services/DebtServices";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";

import DebtShowData from "./debtShowData";
import AbsoluteContainer from "../absoluteContainer";
import Container from "../container";
import DebtForm from "../forms/debtForm";

interface DebtHistoryProps {
	title?: string;
	description?: string;
}

function DebtHistory({
	title = "Histórico de Dívidas",
	description = "Visualize e gerencie suas dívidas",
}: DebtHistoryProps) {
	const { card } = useAuthContext();
	const [debts, setDebts] = useState<DebtDTO[]>([]);
	const [showDebtForm, setShowDebtForm] = useState(false);

	const getDebts = () => {
		if (!card) return;

		GetDebtHistory(card.id).then((data) => {
			setDebts(data);
		});
	};

	useEffect(() => {
		getDebts();
		console.log(debts);
	}, [card]);

	return (
		<Container title={title} description={description}>
			<ul>
				{debts.length &&
					debts.map((debt) => (
						<DebtShowData key={debt.id} debt={debt} />
					))}
			</ul>
			<button
				onClick={() => setShowDebtForm(true)}
				className="w-full mt-4 px-4 py-2 bg-blue text-white rounded-lg hover:bg-dark-blue transition-colors font-medium">
				+ Adicionar Dívida
			</button>
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
