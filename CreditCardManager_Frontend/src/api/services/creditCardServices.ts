import { GetAuthToken } from "../authStorage";
import { METHODS, RequestApi, STATUS_CODE } from "../client";
import {
	type CardUserDTO,
	type RemoveCardUserDTO,
} from "../dtos/cardUsersDtos";

import type {
	CreditCardDTO,
	CreateCreditCardDTO,
	UpdateCreditCardDTO,
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
			if (response.status != STATUS_CODE.Ok)
				return failedResponse(response.data);

			return successResponse();
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

export const UpdateCreditCard = async (
	cardId: number,
	cardData: UpdateCreditCardDTO,
): Promise<responseDTO> => {
	return RequestApi(
		`${PATH}/${cardId}`,
		METHODS.PUT,
		GetAuthToken(),
		cardData,
	)
		.then((response) => {
			if (response.status != STATUS_CODE.Ok)
				return failedResponse(response.data);

			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const updatedCard = response.data as CreditCardDTO;

			return successResponse(updatedCard);
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const DeleteCreditCard = async (cardId: number) => {
	return RequestApi(`${PATH}/${cardId}`, METHODS.DELETE, GetAuthToken())
		.then((response) => {
			if (response.status != STATUS_CODE.NoContent)
				failedResponse(response.data);

			return successResponse();
		})
		.catch((error) => {
			return failedResponse(error);
		});
};

export const RemoveCardUser = async (
	cardId: number,
	cardUserData: RemoveCardUserDTO,
): Promise<responseDTO> => {
	return RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.DELETE,
		GetAuthToken(),
		cardUserData,
	).then((response) => {
		if (response.status != STATUS_CODE.NoContent)
			return failedResponse(response.data);

		return successResponse();
	});
};
