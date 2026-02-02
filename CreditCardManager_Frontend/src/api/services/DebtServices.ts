import { GetAuthToken } from "../authStorage";
import { METHODS, RequestApi, STATUS_CODE } from "../client";
import type { CreateDebtDTO, DebtDTO, UpdateDebtDTO } from "../dtos/debtsDTOs";
import {
	failedResponse,
	successResponse,
	type responseDTO,
} from "../dtos/responses";

const PATH = "/debt";

export const GetDebtHistory = async (cardId: number): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/?cardId=${cardId}`,
		METHODS.GET,
		GetAuthToken(),
	);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Array.isArray(response.data)) return failedResponse();

	const debts = response.data as DebtDTO[];

	return successResponse(debts);
};

export const GetDebt = async (debtId: number): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/detail/${debtId}`,
		METHODS.GET,
		GetAuthToken(),
	);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "id")) return failedResponse();

	const debt = response.data as DebtDTO;

	return successResponse(debt);
};

export const createDebt = async (
	debtData: CreateDebtDTO,
): Promise<responseDTO> => {
	const response = await RequestApi(
		PATH,
		METHODS.POST,
		GetAuthToken(),
		debtData,
	);

	if (response.status != STATUS_CODE.Created)
		return failedResponse(response.data);

	return successResponse();
};

export const updateDebt = async (
	debtId: number,
	debtData: UpdateDebtDTO,
): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/${debtId}`,
		METHODS.PUT,
		GetAuthToken(),
		debtData,
	);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "id")) return failedResponse();

	const debt = response.data as DebtDTO;

	return successResponse(debt);
};

export const deleteDebt = async (debtId: number): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/${debtId}`,
		METHODS.DELETE,
		GetAuthToken(),
	);

	if (response.status != STATUS_CODE.NoContent)
		return failedResponse(response.data);

	return successResponse();
};
