import { useEffect, useState, type ReactNode } from "react";

import { GetCreditCard } from "../api/services/creditCardServices";
import { GetUser } from "../api/services/userServices";

import { ClearAuthToken, GetAuthToken } from "../api/authStorage";

import type { CreditCardDTO } from "../api/dtos/creditCardDtos";
import type { UserDTO } from "../api/dtos/userDtos";

import AuthContext, { type AuthContextImp } from "./authContext";

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
		setCard(undefined);
		setUser(undefined);
		setIsLogged(false);
	};

	const selectCard = (selected: CreditCardDTO) => {
		if (!selected.id) return;

		setCard(selected);
	};

	const updateCard = () => {
		if (!card?.id || !(card?.userId == user?.id)) {
			logout();
			return;
		}

		GetCreditCard(card.id).then((response) => {
			if (response.success) {
				setCard(response.data as CreditCardDTO);
			}
		});
	};

	useEffect(() => {
		const autoLogin = async (): Promise<boolean> => {
			const auth = GetAuthToken();

			if (!auth) return false;

			const response = await GetUser(auth.userId);
			if (response.success) {
				login(response.data as UserDTO);
				return true;
			}

			return false;
		};

		autoLogin();
	}, []);

	const values: AuthContextImp = {
		isLogged: isLogged,
		user: user,
		card: card,
		login: login,
		logout: logout,
		selectCard,
		updateCard: updateCard,
	};

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
}

export default AuthContextProvider;
