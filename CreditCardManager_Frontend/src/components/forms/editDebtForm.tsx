import { useRef, useState, type FormEvent } from "react";

import type { DebtDTO, UpdateDebtDTO } from "../../api/dtos/debtsDTOs";
import { deleteDebt, updateDebt } from "../../api/services/DebtServices";
import useAuthContext from "../../hooks/useAuthContext";
import ActionButton from "../actionButton";

interface EditDebtFormProps {
	debtData: DebtDTO;
	submitHandler?: () => void;
}

function EditDebtForm({
	debtData,
	submitHandler = () => {},
}: EditDebtFormProps) {
	const { updateCard } = useAuthContext();

	const label = useRef<HTMLInputElement>(null);
	const value = useRef<HTMLInputElement>(null);
	const date = useRef<HTMLInputElement>(null);

	const [isWaiting, setIsWaiting] = useState(false);

	const formattedDate = new Date(debtData.date).toISOString().slice(0, 10);

	const handleDelete = async () => {
		const response = await deleteDebt(debtData.id);
		if (response.success) {
			updateCard();
			submitHandler();
			return;
		}
	};

	const handleUpdate = async (event: FormEvent) => {
		event.preventDefault();

		setIsWaiting(true);

		const updatedDebt: UpdateDebtDTO = {
			label: label.current?.value,
			value: Number(value.current?.value),
			date: date.current?.value,
		};

		const response = await updateDebt(debtData.id, updatedDebt);
		if (response.success) {
			updateCard();
			submitHandler();
			return;
		}

		setIsWaiting(false);
	};

	return (
		<form onSubmit={(e) => handleUpdate(e)}>
			<div>
				<label htmlFor="debtLabel">Rótulo da dívida:</label>
				<input
					type="text"
					name="debtLabel"
					placeholder="User Debt"
					maxLength={100}
					ref={label}
					defaultValue={debtData.label || ""}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="debtValue">Quantia da dívida:</label>
				<input
					type="number"
					name="debtValue"
					placeholder="1,00"
					min={0}
					max={99999}
					step={0.01}
					ref={value}
					defaultValue={debtData.value.toFixed(2) || NaN}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="debtDate">Data da dívida:</label>
				<input
					type="date"
					name="debtDate"
					ref={date}
					defaultValue={formattedDate}
					className="input-text"
				/>
			</div>
			<ActionButton
				className="form-button bg-red"
				type="button"
				onClick={handleDelete}>
				delete
			</ActionButton>
			<ActionButton type="submit" className="form-button">
				{isWaiting ? "Waiting..." : "Update"}
			</ActionButton>
		</form>
	);
}

export default EditDebtForm;
