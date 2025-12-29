import { createContext, useEffect, useState } from "react";

import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

import { ClearAuthToken, GetAuthToken } from "../api/client";
import { GetUser } from "../api/services/userServices";

interface IAuthContext {
	isLogged: boolean;
	user: UserDTO | undefined;
	card: CreditCardDTO | undefined;
	login: Function;
	logout: Function;
	updateCard: Function;
}

const defaultAuthContext: IAuthContext = {
	isLogged: false,
	user: undefined,
	card: undefined,
	login: () => {},
	logout: () => {},
	updateCard: () => {},
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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

	useEffect(() => {
		const auth = GetAuthToken();

		if (auth?.userId) {
			GetUser(auth.userId).then((user) => {
				if (user.hasOwnProperty("id")) {
					login(user as UserDTO);
				} else {
					logout();
				}
			});
		}
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
