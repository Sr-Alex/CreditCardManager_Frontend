import { GetAuthToken, METHODS, RequestApi } from "../client";

import type {
	CreditCardDTO,
	CreateCreditCardDTO,
} from "../dtos/creditCardDtos";
import type { UserDTO } from "../dtos/userDtos";

const PATH = "/Creditcard";

export const GetCreditCard = async (cardId: number): Promise<CreditCardDTO> => {
	const response = await RequestApi(`${PATH}/details/${cardId}`, METHODS.GET);
	return response.data as CreditCardDTO;
};

export const GetUserCreditCards = async (
	userId: number
): Promise<Array<CreditCardDTO>> => {
	const response = await RequestApi(`${PATH}/?userid=${userId}`, METHODS.GET);

	return response.data as Array<CreditCardDTO>;
};

export const GetCreditCardUsers = async (
	cardId: number
): Promise<Array<UserDTO>> => {
	const response = await RequestApi(
		`${PATH}/details/${cardId}/users`,
		METHODS.GET,
		GetAuthToken()
	);
	
	return response.data as Array<UserDTO>;
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
