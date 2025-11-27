import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

export const METHODS = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

export function SaveAuthToken(token: string) {
	localStorage.setItem("token", token);
}

export function GetAuthToken(): string | undefined {
	return localStorage.getItem("token") || undefined;
}

export async function RequestApi(
	path: string,
	method: string,
	jwtToken?: string,
	data?: string | object
) {
	return api({
		url: path,
		headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : undefined,
		method: method,
		data: data,
	});
}
