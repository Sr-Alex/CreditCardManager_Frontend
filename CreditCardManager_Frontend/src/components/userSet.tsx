import useAuthContext from "../hooks/useAuthContext";

import AbsoluteContainer from "./absoluteContainer";
import AuthFormContainer from "./forms/authFormContainer";
import UserCardsSelect from "./card/userCardsSelect";

function UserSet() {
	const { isLogged, card } = useAuthContext();

	return (
		(!isLogged || !card) && (
			<AbsoluteContainer>
				{!isLogged ? <AuthFormContainer /> : <UserCardsSelect />}
			</AbsoluteContainer>
		)
	);
}

export default UserSet;
