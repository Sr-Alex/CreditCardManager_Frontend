import { createContext, type SetStateAction, type Dispatch } from "react";
import type { UserDTO } from "../api/dtos/userDtos";

type loginContextType = {
	isLogged: boolean;
	setIsLogged: Dispatch<SetStateAction<boolean>>;
	user: UserDTO | undefined;
	setUser: Dispatch<SetStateAction<UserDTO | undefined>>;
};

const LoginContext = createContext<loginContextType | undefined>(undefined);

export default LoginContext;
