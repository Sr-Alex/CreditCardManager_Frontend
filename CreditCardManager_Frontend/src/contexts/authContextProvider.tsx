import { useState, type ReactNode } from "react";

import { ClearAuthToken } from "../api/authStorage";

import type { UserDTO } from "../api/dtos/userDtos";

import AuthContext, { type AuthContextImp } from "./authContext";

export function AuthContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<UserDTO | undefined>(undefined);

	const login = (userDTO: UserDTO) => {
		setIsLogged(true);
		setUser(userDTO);
	};

	const logout = () => {
		ClearAuthToken();
		setUser(undefined);
		setIsLogged(false);
	};

	const values: AuthContextImp = {
		isLogged: isLogged,
		user: user,
		login: login,
		logout: logout,
	};

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
}

export default AuthContextProvider;
