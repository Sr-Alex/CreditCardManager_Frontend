import { GetAuthToken } from "../authStorage";
import { METHODS, RequestApi, STATUS_CODE } from "../client";
import { type CardUserDTO } from "../dtos/cardUsersDtos";

import type {
	CreditCardDTO,
	CreateCreditCardDTO,
} from "../dtos/creditCardDtos";

import {
	failedResponse,
	successResponse,
	type responseDTO,
} from "../dtos/responses";

const PATH = "/Creditcard";

export const GetCreditCard = async (cardId: number): Promise<responseDTO> => {
	const response = await RequestApi(`${PATH}/details/${cardId}`, METHODS.GET);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "id")) return failedResponse();

	const card = response.data as CreditCardDTO;

	return successResponse(card);
};

export const GetUserCreditCards = async (
	userId: number,
): Promise<responseDTO> => {
	const response = await RequestApi(`${PATH}/?userid=${userId}`, METHODS.GET);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Array.isArray(response.data)) return failedResponse();

	const cards = response.data as CreditCardDTO[];

	return successResponse(cards);
};

export const GetCreditCardUsers = async (
	cardId: number,
): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.GET,
		GetAuthToken(),
	);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Array.isArray(response.data)) return failedResponse();

	const cardUsersGroup = response.data as CardUserDTO[];

	return successResponse(cardUsersGroup);
};

export const AddUser = async (cardId: number, userId: number) => {
	const response = await RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.POST,
		GetAuthToken(),
		userId.toString(),
	);
	return response.data;
};

export const CreateCreditCard = async (
	cardData: CreateCreditCardDTO,
): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}`,
		METHODS.POST,
		GetAuthToken(),
		cardData,
	);

	if (response.status != STATUS_CODE.Created)
		return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "id")) return failedResponse();

	const createdCard = response.data as CreditCardDTO;

	return successResponse(createdCard);
};

export const DeleteCreditCard = async (cardId: number) => {
	const response = await RequestApi(
		`${PATH}/${cardId}`,
		METHODS.DELETE,
		GetAuthToken(),
	);

	if (response.status != STATUS_CODE.NoContent)
		return failedResponse(response.data);

	return successResponse();
};
