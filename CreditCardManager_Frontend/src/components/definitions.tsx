import CardSummary from "./card/CardSummary";
import UserData from "./user/userData";
import useSetUserEnv from "../hooks/useSetUserEnv";

function Definitions() {
	useSetUserEnv();

	return (
		<section className="flex flex-row flex-1 w-full h-fit gap-2 md:flex-col">
			<CardSummary />
			<UserData />
		</section>
	);
}

export default Definitions;
