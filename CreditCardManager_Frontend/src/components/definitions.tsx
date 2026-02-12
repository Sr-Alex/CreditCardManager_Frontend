import CardSummary from "./card/CardSummary";
import UserData from "./user/userData";

function Definitions() {
	return (
		<section className="flex flex-row w-full h-36 gap-2 md:flex-col">
			<CardSummary />
			<UserData />
		</section>
	);
}

export default Definitions;
