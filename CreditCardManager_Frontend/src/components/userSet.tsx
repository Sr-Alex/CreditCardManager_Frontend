import { useAuthContext } from "../contexts/authContext";

import AbsoluteContainer from "./absoluteContainer";
import AuthForm from "./forms/authForm";
import UserCardsSelect from "./card/userCardsSelect";

function UserSet() {
	const { isLogged, card } = useAuthContext();

	return (
		(!isLogged || !card) && (
			<AbsoluteContainer>
				{!isLogged ? <AuthForm /> : <UserCardsSelect />}
			</AbsoluteContainer>
		)
	);
}

export default UserSet;
