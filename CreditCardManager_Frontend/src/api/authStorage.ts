type AuthToken = {
	userId: number;
	token: string;
};

export function SaveAuthToken(token: string, userId: number): void {
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

export function ClearAuthToken(): void {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
}
