export type CardUserDTO = {
	id: number;
	userId: number;
	userName: string;
	debtsCount: number;
	pendingDebts: number;
};

export type RemoveCardUserDTO = {
	cardUserId: number;
};
