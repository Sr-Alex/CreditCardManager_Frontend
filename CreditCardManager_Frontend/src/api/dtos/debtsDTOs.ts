export type DebtDTO = {
	id: number;
	user: number;
	card: number;
	label: string;
	value: number;
	date: string;
};

export type CreateDebtDTO = {
	userId: number;
	cardId: number;
	label?: string;
	value?: number;
	date?: string;
};

export type UpdateDebtDTO = {
	label?: string;
	value?: number;
	date?: string;
};
