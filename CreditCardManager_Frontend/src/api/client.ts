import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

export const METHODS = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

export const STATUS_CODE = {
	Ok: 200,
	Created: 201,
	NoContent: 204,
};

export async function RequestApi(
	path: string = "",
	method: string,
	auth?: { token: string; userId: number },
	data?: string | object,
): Promise<AxiosResponse> {
	return api({
		url: path,
		headers: auth ? { Authorization: `bearer ${auth.token}` } : undefined,
		method: method,
		data: data,
	});
}
