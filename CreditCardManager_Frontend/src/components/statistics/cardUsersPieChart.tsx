import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";

import useCardContext from "../../hooks/useCardContext";

function CardUsersPieChart() {
	const { cardUsers } = useCardContext();

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
		<PieChart
			series={[
				{
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
	);
}

export default CardUsersPieChart;
