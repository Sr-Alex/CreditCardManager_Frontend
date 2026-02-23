import { useEffect } from "react";

import { GetAuthToken } from "../api/authStorage";

import type { UserDTO } from "../api/dtos/userDtos";
import { GetUser } from "../api/services/userServices";

import useAuthContext from "./useAuthContext";
import useModalContext from "./useModalContext";
import AuthFormContainer from "../components/auth/authFormContainer";
import UserCardsListContainer from "../components/card/userCardsListContainer";

function useSetUserEnv() {
	const { isLogged, login, logout } = useAuthContext();
	const { openModal } = useModalContext();

	useEffect(() => {
		const autoLogin = async (): Promise<void> => {
			const auth = GetAuthToken();

			if (auth?.userId && !isLogged) {
				const response = await GetUser(auth.userId);
				if (response.success) {
					login(response.data as UserDTO);
					openModal(<UserCardsListContainer />);
					return;
				}
			} else {
				logout();
				openModal(<AuthFormContainer />);
			}
		};

		autoLogin();
	}, []);
}

export default useSetUserEnv;
