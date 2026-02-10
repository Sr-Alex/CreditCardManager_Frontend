import CardSummary from "./card/CardSummary";
import UserData from "./user/userData";

function Definitions() {
	return (
		<section className="flex min-w-80 h-36 gap-2">
			<CardSummary />
			<UserData />
		</section>
	);
}

export default Definitions;
