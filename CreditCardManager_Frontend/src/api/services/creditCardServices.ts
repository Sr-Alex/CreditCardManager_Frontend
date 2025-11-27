import { GetAuthToken, METHODS, RequestApi } from "../client";

import type { CardUsersDTO } from "../dtos/cardUsersDtos";
import type {
	CreditCardDTO,
	CreateCreditCardDTO,
} from "../dtos/creditCardDtos";

const PATH = "/creditcard";

export const GetCreditCard = async (cardId: number): Promise<CreditCardDTO> => {
	const response = await RequestApi(`${PATH}/details/${cardId}`, METHODS.GET);
	return response.data as CreditCardDTO;
};

export const GetUserCreditCards = async (userId: number) => {
	const response = await RequestApi(`${PATH}/${userId}`, METHODS.GET);
	return response.data;
};

export const GetCreditCardUsers = async (
	cardId: number
): Promise<CardUsersDTO> => {
	const response = await RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.GET,
		GetAuthToken()
	);
	return response.data as CardUsersDTO;
};

export const AddUser = async (cardId: number, userId: number) => {
	const response = await RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.POST,
		GetAuthToken(),
		userId.toString()
	);
	return response.data;
};

export const CreateCreditCard = async (cardData: CreateCreditCardDTO) => {
	const response = await RequestApi(
		`${PATH}`,
		METHODS.POST,
		GetAuthToken(),
		cardData
	);
	return response.data;
};

export const DeleteCreditCard = async (cardId: number) => {
	const response = await RequestApi(
		`${PATH}/${cardId}`,
		METHODS.DELETE,
		GetAuthToken()
	);
	return response.data;
};
