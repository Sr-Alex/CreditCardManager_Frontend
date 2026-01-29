export type CreditCardDTO = {
	id: number;
	userId: number;
	cardName?: string;
	expiresAt: string;
	invoice?: number;
	limit?: number;
};

export type CreateCreditCardDTO = {
	userId: number;
	cardName?: string;
	expiresAt?: string;
	Limit?: number;
};
