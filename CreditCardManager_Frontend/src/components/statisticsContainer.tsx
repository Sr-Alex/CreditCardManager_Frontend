import { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";

import useCardContext from "../hooks/useCardContext";

import Container from "./container";

type DebtsCardUser = {
	label: string;
	value: number;
	userName: string;
	date: string;
};

function StatisticsContainer() {
	const { card, debts, cardUsers } = useCardContext();

	const [isWideScreen, setIsWideScreen] = useState<boolean>(
		window.innerWidth > 600,
	);

	useEffect(() => {
		const handleResize = () => {
			setIsWideScreen(window.innerWidth > 768);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	});

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
					slotProps={
						isWideScreen
							? {
									legend: {
										position: { horizontal: "center" },
										direction: "horizontal",
									},
								}
							: undefined
					}
				/>
			)}
		</Container>
	);
}

export default StatisticsContainer;
