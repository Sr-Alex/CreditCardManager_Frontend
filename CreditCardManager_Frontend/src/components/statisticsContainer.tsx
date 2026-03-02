import { useMemo } from "react";
import { BarChart, PieChart } from "@mui/x-charts";

import useCardContext from "../hooks/useCardContext";

import { formatCurrencyValue } from "../utils/formatters";

import Container from "./container";
import type { CardUserDTO } from "../api/dtos/cardUsersDtos";

type DebtsCardUser = {
	label: string;
	value: number;
	userName: string;
	date: string;
};

function StatisticsContainer() {
	const { card, debts, cardUsers } = useCardContext();

	const debtsCardUser = useMemo(() => {
		const debtCardUserList: DebtsCardUser[] = [];
		debts.forEach((debt) => {
			const cardUser: CardUserDTO | undefined = cardUsers.find(
				(user) => user.userId === debt.user,
			);

			if (cardUser) {
				debtCardUserList.push({
					label: debt.label,
					value: debt.value,
					userName: cardUser.userName,
					date: debt.date,
				});
			}
		});
		return debtCardUserList;
	}, [debts, cardUsers]);

	return (
		<Container title="Statistics" className="w-full max-h-80">
			{debts.length > 0 && card && (
				<PieChart
					series={[
						{
							arcLabel: (d) =>
								`${((d.value * 100) / card.invoice).toFixed(2)}%`,
							data: cardUsers
								.filter((cardU) => cardU.totalAmount > 0)
								.map((cardU, index) => {
									return {
										id: index,
										value: cardU.totalAmount,
										label: cardU.userName,
									};
								}),
						},
					]}
					height={200}
					width={200}
					slotProps={{
						legend: {
							position: { horizontal: "center" },
							direction: "horizontal",
						},
					}}
				/>
			)}
		</Container>
	);
}

export default StatisticsContainer;
