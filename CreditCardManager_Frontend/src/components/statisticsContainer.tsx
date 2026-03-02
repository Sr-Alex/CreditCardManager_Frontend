import useCardContext from "../hooks/useCardContext";

import Container from "./container";
import CardUsersPieChart from "./statistics/cardUsersPieChart";

function StatisticsContainer() {
	const { card } = useCardContext();
	return (
		<Container title="Statistics" className="w-full max-h-80">
			{card && <CardUsersPieChart />}
		</Container>
	);
}

export default StatisticsContainer;
