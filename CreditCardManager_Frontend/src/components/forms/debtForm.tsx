import { useRef, type FormEvent } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";

import { createDebt } from "../../api/services/DebtServices";
import type { CreateDebtDTO } from "../../api/dtos/debtsDTOs";

interface DebtFormProps {
	handleSubmit: Function | undefined;
}

function DebtForm({ handleSubmit = () => {} }: DebtFormProps) {
	const { user, card } = useAuthContext();

	const label = useRef<HTMLInputElement>(null);
	const value = useRef<HTMLInputElement>(null);
	const date = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		label.current!.value = "";
		value.current!.value = "";
		date.current!.value = "";
	};

	const handleCreate = (event: FormEvent) => {
		event.preventDefault();

		if (!user || !card) return;

		const debtData: CreateDebtDTO = {
			userId: user.id,
			cardId: card.id,
			label: label.current?.value || undefined,
			value: Number(value.current?.value) || undefined,
			date: date.current?.value || undefined,
		};

		createDebt(debtData).then(() => {
			handleSubmit();
		});
	};

	return (
		<form onSubmit={(e) => handleCreate(e)}>
			<div>
				<label htmlFor="debtLabel">Rótulo da dívida:</label>
				<input
					type="text"
					name="debtLabel"
					placeholder="User Debt"
					maxLength={100}
					ref={label}
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
					max={999999}
					step={0.01}
					ref={value}
					className="input-text"
				/>
			</div>
			<div>
				<label htmlFor="debtDate">Data da dívida:</label>
				<input
					type="date"
					name="debtDate"
					ref={date}
					className="input-text"
				/>
			</div>
			<button className="form-button" type="button" onClick={handleReset}>
				Reset
			</button>
			<button className="form-button" type="submit">
				Submit
			</button>
		</form>
	);
}

export default DebtForm;
