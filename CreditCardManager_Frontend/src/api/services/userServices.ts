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
	const response = await RequestApi(
		`${PATH}/login`,
		METHODS.POST,
		undefined,
		{ email, password },
	);

	if (response.status != STATUS_CODE.Ok) {
		return failedResponse(response.data);
	}

	if (!Object.hasOwn(response.data, "token")) return failedResponse();

	const loginUser = response.data;

	SaveAuthToken(loginUser?.token, loginUser?.user.id);

	return successResponse(loginUser.user);
};

export const GetUser = async (userId: number): Promise<responseDTO> => {
	const response = await RequestApi(`${PATH}/${userId}`, METHODS.GET);

	if (response.status != STATUS_CODE.Ok) return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "id")) return failedResponse();

	const user = response.data as UserDTO;

	return successResponse(user);
};

export const CreateUser = async (
	userData: CreateUserDTO,
): Promise<responseDTO> => {
	const response = await RequestApi(PATH, METHODS.POST, undefined, userData);

	if (response.status != STATUS_CODE.Created)
		return failedResponse(response.data);

	if (!Object.hasOwn(response.data, "token")) return failedResponse();

	const createdUser = response.data;

	SaveAuthToken(createdUser?.token, createdUser?.user.id);

	return successResponse(createdUser.user as UserDTO);
};

export const DeleteUser = async (userId: number): Promise<responseDTO> => {
	const response = await RequestApi(
		`${PATH}/${userId}`,
		METHODS.DELETE,
		GetAuthToken(),
	);

	if (response.status !== STATUS_CODE.NoContent)
		return failedResponse(response.data);

	ClearAuthToken();
	return successResponse();
};
