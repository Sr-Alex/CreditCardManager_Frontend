import type { DebtDTO } from "../../api/dtos/debtsDTOs";

function DebtShowData({ debt }: { debt: DebtDTO }) {
	return (
		<li>
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-lg font-medium">{debt.label}</h3>
					<p className="text-gray-600">{debt.value}</p>
				</div>
			</div>
		</li>
	);
}

export default DebtShowData;