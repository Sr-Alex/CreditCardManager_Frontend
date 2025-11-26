import { METHODS, RequestApi, saveAuthToken } from "../client";
import type { UserDTO, CreateUserDTO } from "../dtos/userDtos";

const PATH = "/user";

export const LoginUser = async (
	email: string,
	password: string
): Promise<boolean | object> => {
	const response = await RequestApi(
		`${PATH}/login`,
		METHODS.POST,
		undefined,
		{ email, password }
	);

	const data = response.data;

	if (response.status === 200) {
		saveAuthToken(data.token);
		return true;
	} else {
		return data;
	}
};

export const GetUser = async (userId: number): Promise<UserDTO | object> => {
	const response = await RequestApi(`${PATH}/${userId}`, METHODS.GET);
	return response.data as UserDTO;
};

export const CreateUser = async (
	userData: CreateUserDTO
): Promise<boolean | object> => {
	const response = await RequestApi(PATH, METHODS.POST, undefined, userData);

	let data = response.data;

	if (response.status === 201) {
		saveAuthToken(data.token);
		return true;
	} else {
		return data;
	}
};

export const UpdateUser = async (userId: number, userData: CreateUserDTO) => {
	const response = await RequestApi(
		`${PATH}/${userId}`,
		METHODS.PUT,
		undefined,
		userData
	);
	return response.data;
};

export const DeleteUser = async (userId: number) => {
	const response = await RequestApi(`${PATH}/${userId}`, METHODS.DELETE);
	return response.data;
};
