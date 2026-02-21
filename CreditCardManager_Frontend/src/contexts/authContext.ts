import { createContext, type Context } from "react";

import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

export interface AuthContextImp {
	isLogged: boolean;
	user: UserDTO | undefined;
	card: CreditCardDTO | undefined;
	login: (userDto: UserDTO) => void;
	logout: () => void;
	selectCard: (selected?: CreditCardDTO) => void;
	updateCard: () => void;
}

const DEFAULT_AUTHCONTEXT: AuthContextImp = {
	isLogged: false,
	user: undefined,
	card: undefined,
	login: () => {},
	logout: () => {},
	selectCard: () => {},
	updateCard: () => {},
};

const AuthContext: Context<AuthContextImp> =
	createContext<AuthContextImp>(DEFAULT_AUTHCONTEXT);

export default AuthContext;
