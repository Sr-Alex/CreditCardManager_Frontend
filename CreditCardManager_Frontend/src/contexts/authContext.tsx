import {
	createContext,
	useEffect,
	useState,
	type Context,
	type ReactNode,
} from "react";

import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

import { GetUser } from "../api/services/userServices";
import { GetCreditCard } from "../api/services/creditCardServices";
import { ClearAuthToken, GetAuthToken } from "../api/authStorage";

export interface AuthContextImp {
	isLogged: boolean;
	user: UserDTO | undefined;
	card: CreditCardDTO | undefined;
	login: (userDto: UserDTO) => void;
	logout: () => void;
	selectCard: (selected: CreditCardDTO) => void;
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

	const autoLogin = (): boolean => {
		const auth = GetAuthToken();

		if (!auth) return false;

		GetUser(auth.userId).then((response) => {
			if (response.success) login(response.data as UserDTO);
		});

		return true;
	};

	useEffect(() => {
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

export default AuthContext;
