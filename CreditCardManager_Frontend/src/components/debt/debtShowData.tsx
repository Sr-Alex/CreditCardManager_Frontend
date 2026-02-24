import { DollarSign, Pencil } from "lucide-react";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";

import useModalContext from "../../hooks/useModalContext";

import {
	formatDateToString,
	formatCurrencyValue,
} from "../../utils/formatters";

import ActionButton from "../actionButton";
import EditDebtFormContainer from "./editDebtFormContainer";
import PayDebtFormContainer from "./payDebtFormContainer";

interface DebtShowDataProps {
	debtData: DebtDTO;
	editable?: boolean;
	payable?: boolean;
}

function DebtShowData({
	debtData,
	editable = false,
	payable = false,
}: DebtShowDataProps) {
	const { openModal } = useModalContext();

	const formattedDate: string = formatDateToString(new Date(debtData.date));
	const formattedValue: string = formatCurrencyValue(debtData.value);

	const handlePayClick = () => {
		openModal(<PayDebtFormContainer debtData={debtData} />);
	};

	const handleEditClick = () => {
		openModal(<EditDebtFormContainer debtData={debtData} />);
	};

	return (
		<li className="px-4 py-2 my-2 rounded-lg border-2 border-dark-slate hover:bg-light-gray dark:hover:bg-dark-slate hover:shadow-md transition-all delay-200 duration-200">
			<div className="mb-2 gap-4 grid grid-cols-3 sm:grid-cols-4">
				<div>
					<p className="text-sm text-gray font-semibold">Rótulo</p>
					<p
						title={debtData.label}
						className="overflow-hidden text-ellipsis text-md font-medium">
						{debtData.label}
					</p>
				</div>

				<div>
					<p className="text-sm text-gray font-semibold">Data</p>
					<p className="text-md font-medium">{formattedDate}</p>
				</div>

				<div>
					<p className="text-sm text-gray font-semibold">Valor</p>
					<p className={`text-md font-medium text-red`}>
						{formattedValue}
					</p>
				</div>
				<div>
					<p className="text-sm text-gray font-semibold">Status</p>
					<p className={`text-md font-medium`}>
						{debtData.isPaid ? "Paga" : "Não Paga"}
					</p>
				</div>
			</div>
			{(editable || payable) && (
				<div className="flex gap-2">
					{payable && (
						<ActionButton
							onClick={handlePayClick}
							className="px-2 py-1 rounded-full">
							<DollarSign />
						</ActionButton>
					)}
					{editable && (
						<ActionButton
							onClick={handleEditClick}
							className="px-2 py-1 rounded-full">
							<Pencil />
						</ActionButton>
					)}
				</div>
			)}
		</li>
	);
}

export default DebtShowData;
