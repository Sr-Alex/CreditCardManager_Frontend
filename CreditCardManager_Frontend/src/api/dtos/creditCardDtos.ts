export type CreditCardDTO = {
	id: number;
	userId: number;
	cardName?: string;
	expiresAt: string;
	invoice?: string;
	limit?: string;
};

export type CreateCreditCardDTO = {
	userId: number;
	cardName?: string;
	expiresAt?: string;
	Limit?: string;
};
