import { GetAuthToken, METHODS, RequestApi } from "../client";
import type { CreateDebtDTO, DebtDTO, UpdateDebtDTO } from "../dtos/debtsDTOs";

const PATH = "/debt";

export const GetDebtHistory = async (cardId: number): Promise<DebtDTO[]> => {
	const response = await RequestApi(
		`${PATH}/?cardId=${cardId}`,
		METHODS.GET,
		GetAuthToken(),
	);

	const debts = response.data as DebtDTO[];

	return debts;
};

export const GetDebt = async (debtId: number): Promise<DebtDTO> => {
	const response = await RequestApi(
		`${PATH}/detail/${debtId}`,
		METHODS.GET,
		GetAuthToken(),
	);
	const debt = response.data as DebtDTO;

	return debt;
};

export const createDebt = async (debtData: CreateDebtDTO): Promise<boolean> => {
	const response = await RequestApi(
		PATH,
		METHODS.POST,
		GetAuthToken(),
		debtData,
	);

	if (response.status !== 200) return false;

	return true;
};

export const updateDebt = async (
	debtId: number,
	debtData: UpdateDebtDTO,
): Promise<DebtDTO> => {
	const response = await RequestApi(
		`${PATH}/${debtId}`,
		METHODS.PUT,
		GetAuthToken(),
		debtData,
	);

	const debt = response.data as DebtDTO;

	return debt;
};

export const deleteDebt = async (debtId: number): Promise<boolean> => {
	const response = await RequestApi(
		`${PATH}/${debtId}`,
		METHODS.DELETE,
		GetAuthToken(),
	);

	if (response.status != 200) {
		return false;
	}

	return true;
};
