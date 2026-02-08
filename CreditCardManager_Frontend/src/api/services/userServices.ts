import { METHODS, RequestApi, STATUS_CODE } from "../client";

import { ClearAuthToken, GetAuthToken, SaveAuthToken } from "../authStorage";

import type { UserDTO, CreateUserDTO } from "../dtos/userDtos";
import {
	failedResponse,
	successResponse,
	type responseDTO,
} from "../dtos/responses";

const PATH = "/user";

export const LoginUser = async (
	email: string,
	password: string,
): Promise<responseDTO> => {
	return RequestApi(`${PATH}/login`, METHODS.POST, undefined, {
		email,
		password,
	})
		.then((response) => {
			if (response.status != STATUS_CODE.Ok) {
				return failedResponse(response.data);
			}

			if (!Object.hasOwn(response.data, "token")) return failedResponse();

			const loginUser = response.data;

			SaveAuthToken(loginUser?.token, loginUser?.user.id);

			return successResponse(loginUser.user);
		})
		.catch((error) => failedResponse(error));
};

export const GetUser = async (userId: number): Promise<responseDTO> => {
	return RequestApi(`${PATH}/${userId}`, METHODS.GET)
		.then((response) => {
			if (!Object.hasOwn(response.data, "id")) return failedResponse();

			const user = response.data as UserDTO;

			return successResponse(user);
		})
		.catch((error) => failedResponse(error));
};

export const CreateUser = async (
	userData: CreateUserDTO,
): Promise<responseDTO> => {
	return RequestApi(PATH, METHODS.POST, undefined, userData)
		.then((response) => {
			if (!Object.hasOwn(response.data, "token")) return failedResponse();

			const createdUser = response.data;

			SaveAuthToken(createdUser?.token, createdUser?.user.id);

			return successResponse(createdUser.user as UserDTO);
		})
		.catch((error) => failedResponse(error));
};

export const DeleteUser = async (userId: number): Promise<responseDTO> => {
	return RequestApi(`${PATH}/${userId}`, METHODS.DELETE, GetAuthToken())
		.then(() => {
			ClearAuthToken();
			return successResponse();
		})
		.catch((error) => failedResponse(error));
};
