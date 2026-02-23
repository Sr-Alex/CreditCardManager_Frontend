import { useState, type ReactNode } from "react";

import { GetCreditCard } from "../api/services/creditCardServices";

import { ClearAuthToken } from "../api/authStorage";

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

	const selectCard = (selected?: CreditCardDTO) => {
		if (!selected || !selected.id) {
			setCard(undefined);
			return;
		}

		setCard(selected);
	};

	const updateCard = async () => {
		if (!card?.id) return;

		const response = await GetCreditCard(card.id);

		if (response.success) {
			setCard(response.data as CreditCardDTO);
		}
	};

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
