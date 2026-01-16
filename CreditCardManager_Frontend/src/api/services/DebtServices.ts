import { GetAuthToken, METHODS, RequestApi } from "../client";
import type { CreateDebtDTO, DebtDTO, UpdateDebtDTO } from "../dtos/debtsDTOs";

const PATH = "/debt";

export const GetDebtHistory = async (cardId: number): Promise<DebtDTO[]> => {
	const response = await RequestApi(
		`${PATH}/?cardId=${cardId}`,
		METHODS.GET,
		GetAuthToken()
	);

	const debts = response.data as DebtDTO[];

	return debts;
};

export const GetDebt = async (debtId: number): Promise<DebtDTO> => {
	const response = await RequestApi(
		`${PATH}/detail/${debtId}`,
		METHODS.GET,
		GetAuthToken()
	);
	const debt = response.data as DebtDTO;

	return debt;
};

export const createDebt = async (debtData: CreateDebtDTO): Promise<DebtDTO> => {
	const response = await RequestApi(
		PATH,
		METHODS.POST,
		GetAuthToken(),
		debtData
	);

	const debt = response.data as DebtDTO;

	return debt;
};

export const updateDebt = async (
	debtId: number,
	debtData: UpdateDebtDTO
): Promise<DebtDTO> => {
	const response = await RequestApi(
		`${PATH}/pay/${debtId}`,
		METHODS.PUT,
		GetAuthToken(),
		debtData
	);

	const debt = response.data as DebtDTO;

	return debt;
};
