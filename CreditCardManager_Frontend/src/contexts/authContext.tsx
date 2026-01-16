import {
	createContext,
	useContext,
	useEffect,
	useState,
	type Context,
	type ReactNode,
} from "react";

import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

import { ClearAuthToken, GetAuthToken } from "../api/client";
import { GetUser } from "../api/services/userServices";
import type { DebtDTO } from "../api/dtos/debtsDTOs";

interface IAuthContext {
	isLogged: boolean;
	user: UserDTO | undefined;
	card: CreditCardDTO | undefined;
	debts: DebtDTO[] | undefined;
	login: Function;
	logout: Function;
	updateCard: Function;
}

const defaultAuthContext: IAuthContext = {
	isLogged: false,
	user: undefined,
	card: undefined,
	debts: [],
	login: () => {},
	logout: () => {},
	updateCard: () => {},
};

const AuthContext: Context<IAuthContext> =
	createContext<IAuthContext>(defaultAuthContext);

export function useAuthContext(): IAuthContext {
	return useContext(AuthContext);
}

export function AuthContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<UserDTO | undefined>(undefined);
	const [card, setCard] = useState<CreditCardDTO | undefined>(undefined);
	const [debts, setDebts] = useState<DebtDTO[] | undefined>(undefined);

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
		debts: debts,
		login: login,
		logout: logout,
		updateCard: updateCard,
	};

	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
}

export default AuthContext;
