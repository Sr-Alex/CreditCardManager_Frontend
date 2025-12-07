import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
});

type AuthToken = {
	userId: number;
	token: string;
};

export const METHODS = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete",
};

export function SaveAuthToken(token: string, userId: number) {
	localStorage.setItem("token", token);
	localStorage.setItem("userId", userId.toString());
}

export function GetAuthToken(): AuthToken | undefined {
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	if (token && userId) {
		return { token, userId: parseInt(userId) };
	}

	return undefined;
}

export function ClearAuthToken() {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
}

export async function RequestApi(
	path: string = "",
	method: string,
	auth?: { token: string; userId: number },
	data?: string | object
) {
	return api({
		url: path,
		headers: auth ? { Authorization: `bearer ${auth.token}` } : undefined,
		method: method,
		data: data,
	});
}
