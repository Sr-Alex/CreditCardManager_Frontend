import {
	createContext,
	useEffect,
	useState,
	type Context,
	type ReactNode,
} from "react";

import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

import { ClearAuthToken, GetAuthToken } from "../api/client";
import { GetUser } from "../api/services/userServices";

export interface IAuthContext {
	isLogged: boolean;
	user: UserDTO | undefined;
	card: CreditCardDTO | undefined;
	login: (userDto: UserDTO) => void;
	logout: () => void;
	updateCard: (card: CreditCardDTO | undefined) => void;
}

const DEFAULT_AUTHCONTEXT: IAuthContext = {
	isLogged: false,
	user: undefined,
	card: undefined,
	login: () => {},
	logout: () => {},
	updateCard: () => {},
};

const AuthContext: Context<IAuthContext> =
	createContext<IAuthContext>(DEFAULT_AUTHCONTEXT);

export function AuthContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<UserDTO | undefined>(undefined);
	const [card, setCard] = useState<CreditCardDTO | undefined>(undefined);

	const login = (userDTO: UserDTO) => {
		setIsLogged(true);
		setUser(userDTO);
	};

	const logout = () => {
		ClearAuthToken();
		updateCard(undefined);
		setIsLogged(false);
		setUser(undefined);
	};

	const updateCard = (card: CreditCardDTO | undefined) => {
		setCard(card);
	};

	const autoLogin = (): boolean => {
		const auth = GetAuthToken();

		if (!auth) return false;

		GetUser(auth.userId).then((response) => {
			if (Object.hasOwn(response, "id")) login(response as UserDTO);
		});

		return true;
	};

	useEffect(() => {
		autoLogin();
	}, []);

	const values = {
		isLogged: isLogged,
		user: user,
		card: card,
		login: login,
		logout: logout,
		updateCard: updateCard,
	};

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
}

export default AuthContext;
