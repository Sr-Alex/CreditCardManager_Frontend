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
	return RequestApi(`${PATH}/?cardId=${cardId}`, METHODS.GET, GetAuthToken())
		.then((response) => {
			if (!Array.isArray(response.data)) return failedResponse();

			const debts = response.data as DebtDTO[];

			return successResponse(debts);
		})
		.catch((error) => failedResponse(error));
};

export const GetDebt = async (debtId: number): Promise<responseDTO> => {
	return RequestApi(`${PATH}/detail/${debtId}`, METHODS.GET, GetAuthToken())
		.then((response) => {
			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const debt = response.data as DebtDTO;

			return successResponse(debt);
		})
		.catch((error) => failedResponse(error));
};

export const createDebt = async (
	debtData: CreateDebtDTO,
): Promise<responseDTO> => {
	return RequestApi(PATH, METHODS.POST, GetAuthToken(), debtData)
		.then((response) => {
			if (response.status != STATUS_CODE.Created)
				return failedResponse(response.data);

			return successResponse();
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const updateDebt = async (
	debtId: number,
	debtData: UpdateDebtDTO,
): Promise<responseDTO> => {
	return RequestApi(
		`${PATH}/${debtId}`,
		METHODS.PUT,
		GetAuthToken(),
		debtData,
	)
		.then((response) => {
			if (response.status != STATUS_CODE.Ok)
				return failedResponse(response.data);

			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const debt = response.data as DebtDTO;

			return successResponse(debt);
		})
		.catch((error) => failedResponse(error));
};

export const deleteDebt = async (debtId: number): Promise<responseDTO> => {
	return RequestApi(`${PATH}/${debtId}`, METHODS.DELETE, GetAuthToken())
		.then((response) => {
			if (response.status != STATUS_CODE.NoContent)
				return failedResponse(response.data);

			return successResponse();
		})
		.catch((error) => failedResponse(error));
};

export const payDebt = async (debtId: number): Promise<responseDTO> => {
	return RequestApi(`${PATH}/${debtId}/pay`, METHODS.POST, GetAuthToken())
		.then((response) => {
			if (response.status != STATUS_CODE.NoContent)
				return failedResponse(response.data);

			return successResponse();
		})
		.catch((error) => failedResponse(error));
};
