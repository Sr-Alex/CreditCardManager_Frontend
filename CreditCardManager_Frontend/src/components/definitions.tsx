import CardSummary from "./card/CardSummary";
import UserData from "./user/userData";
import useSetUserEnv from "../hooks/useSetUserEnv";
import StatisticsContainer from "./statisticsContainer";

function Definitions() {
	useSetUserEnv();

	return (
		<section className="flex flex-col gap-2">
			<div className="flex flex-row flex-wrap w-full h-fit gap-2 md:flex-col">
				<CardSummary />
				<UserData />
			</div>
			<StatisticsContainer />
		</section>
	);
}

export default Definitions;
