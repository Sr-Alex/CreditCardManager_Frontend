import { createContext, type SetStateAction, type Dispatch } from "react";
import type { UserDTO } from "../api/dtos/userDtos";
import type { CreditCardDTO } from "../api/dtos/creditCardDtos";

type loginContextType = {
	isLogged: boolean;
	setIsLogged: Dispatch<SetStateAction<boolean>>;
	user: UserDTO | undefined;
	setUser: Dispatch<SetStateAction<UserDTO | undefined>>;
	card: CreditCardDTO | undefined;
	setCard: Dispatch<SetStateAction<CreditCardDTO | undefined>>;
};

const LoginContext = createContext<loginContextType | undefined>(undefined);

export default LoginContext;
