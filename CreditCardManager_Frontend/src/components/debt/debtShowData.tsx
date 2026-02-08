import { useState } from "react";

import { DollarSign, Pencil } from "lucide-react";

import type { DebtDTO } from "../../api/dtos/debtsDTOs";

import {
	formatDateToString,
	formatCurrencyValue,
} from "../../utils/formatters";

import ActionButton from "../actionButton";
import AbsoluteContainer from "../absoluteContainer";
import Container from "../container";
import EditDebtForm from "../forms/editDebtForm";

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
	const [showEditForm, setShowEditForm] = useState(false);

	const formattedDate: string = formatDateToString(new Date(debtData.date));

	const formattedValue: string = formatCurrencyValue(debtData.value);

	return (
		<li className="px-4 py-2 my-2 rounded-lg border border-opaque hover:shadow-md transition-shadow">
			<div className="mb-2 gap-4 grid grid-cols-3 md:grid-cols-4">
				<div>
					<p className="text-sm text-gray font-semibold">Rótulo</p>
					<p
						className="overflow-hidden text-ellipsis text-md font-medium"
						defaultValue={debtData.label}>
						{debtData.label}
					</p>
				</div>

				<div className="">
					<p className="text-sm text-gray font-semibold">Data</p>
					<p className="text-md font-medium">{formattedDate}</p>
				</div>

				<div>
					<p className="text-sm text-gray font-semibold">Valor</p>
					<p className="text-md font-medium text-red">
						{formattedValue}
					</p>
				</div>
			</div>
			{(editable || payable) && (
				<div className="flex gap-2">
					{payable && (
						<ActionButton
							onClick={() => {}}
							className="px-2 py-1 rounded-full">
							<DollarSign />
						</ActionButton>
					)}
					{editable && (
						<ActionButton
							onClick={() => {
								setShowEditForm(true);
							}}
							className="px-2 py-1 rounded-full">
							<Pencil />
						</ActionButton>
					)}
				</div>
			)}

			{showEditForm && (
				<AbsoluteContainer>
					<Container
						title="Atualize ou exclua uma dívida registrada!"
						closeButton
						closeButtonHandler={() => {
							setShowEditForm(false);
						}}>
						<EditDebtForm
							debtData={debtData}
							submitHandler={() => {
								setShowEditForm(false);
							}}
						/>
					</Container>
				</AbsoluteContainer>
			)}
		</li>
	);
}

export default DebtShowData;
