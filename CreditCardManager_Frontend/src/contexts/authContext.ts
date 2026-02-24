import { createContext, type Context } from "react";

import type { UserDTO } from "../api/dtos/userDtos";

export interface AuthContextImp {
	isLogged: boolean;
	user: UserDTO | undefined;
	login: (userDto: UserDTO) => void;
	logout: () => void;
}

const DEFAULT_AUTHCONTEXT: AuthContextImp = {
	isLogged: false,
	user: undefined,
	login: () => {},
	logout: () => {},
};

const AuthContext: Context<AuthContextImp> =
	createContext<AuthContextImp>(DEFAULT_AUTHCONTEXT);

export default AuthContext;
