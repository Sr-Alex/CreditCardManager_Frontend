import {
	ClearAuthToken,
	GetAuthToken,
	METHODS,
	RequestApi,
	SaveAuthToken,
} from "../client";
import type { UserDTO, CreateUserDTO } from "../dtos/userDtos";

const PATH = "/user";

export const LoginUser = async (
	email: string,
	password: string,
): Promise<UserDTO | object> => {
	const response = await RequestApi(
		`${PATH}/login`,
		METHODS.POST,
		undefined,
		{ email, password },
	);

	const loginUser = response.data;

	SaveAuthToken(loginUser?.token, loginUser?.user.id);
	return loginUser.user as UserDTO;
};

export const GetUser = async (userId: number): Promise<UserDTO | object> => {
	const response = await RequestApi(`${PATH}/${userId}`, METHODS.GET);
	return response.data as UserDTO;
};

export const CreateUser = async (
	userData: CreateUserDTO,
): Promise<UserDTO | object> => {
	const response = await RequestApi(PATH, METHODS.POST, undefined, userData);

	const createUser = response.data;

	SaveAuthToken(createUser?.token, createUser?.user.id);
	return createUser.user as UserDTO;
};

export const UpdateUser = async (userId: number, userData: CreateUserDTO) => {
	const response = await RequestApi(
		`${PATH}/${userId}`,
		METHODS.PUT,
		GetAuthToken(),
		userData,
	);
	return response.data;
};

export const DeleteUser = async (userId: number) => {
	const response = await RequestApi(
		`${PATH}/${userId}`,
		METHODS.DELETE,
		GetAuthToken(),
	);
	ClearAuthToken();
	return response.data;
};
