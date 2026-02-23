import { useEffect } from "react";

import useAuthContext from "./useAuthContext";
import useModalContext from "./useModalContext";
import AuthFormContainer from "../components/auth/authFormContainer";
import UserCardsListContainer from "../components/card/userCardsListContainer";

function useSetUserEnv() {
	const { isLogged, card } = useAuthContext();
	const { openModal } = useModalContext();

	useEffect(() => {
		if (!isLogged) {
			openModal(<AuthFormContainer />);
		} else if (!card) openModal(<UserCardsListContainer />);
	}, [isLogged, card, openModal]);
}

export default useSetUserEnv;
