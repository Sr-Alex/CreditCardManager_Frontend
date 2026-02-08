import { GetAuthToken } from "../authStorage";
import { METHODS, RequestApi } from "../client";
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
	return RequestApi(`${PATH}/details/${cardId}`, METHODS.GET)
		.then((response) => {
			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const card = response.data as CreditCardDTO;

			return successResponse(card);
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const GetUserCreditCards = async (
	userId: number,
): Promise<responseDTO> => {
	return RequestApi(`${PATH}/?userid=${userId}`, METHODS.GET, GetAuthToken())
		.then((response) => {
			if (!Array.isArray(response.data)) return failedResponse();

			const cards = response.data as CreditCardDTO[];

			return successResponse(cards);
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const GetCreditCardUsers = async (
	cardId: number,
): Promise<responseDTO> => {
	return RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.GET,
		GetAuthToken(),
	)
		.then((response) => {
			if (!Array.isArray(response.data)) return failedResponse();

			const cardUsers = response.data as CardUserDTO[];

			return successResponse(cardUsers);
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const AddUser = async (cardId: number, userEmail: string) => {
	return RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.POST,
		GetAuthToken(),
		{ userEmail: userEmail },
	)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const CreateCreditCard = async (
	cardData: CreateCreditCardDTO,
): Promise<responseDTO> => {
	return RequestApi(`${PATH}`, METHODS.POST, GetAuthToken(), cardData)
		.then((response) => {
			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const createdCard = response.data as CreditCardDTO;

			return successResponse(createdCard);
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const DeleteCreditCard = async (cardId: number) => {
	return RequestApi(`${PATH}/${cardId}`, METHODS.DELETE, GetAuthToken())
		.then(() => {
			return successResponse();
		})
		.catch((error) => {
			return failedResponse(error);
		});
};
