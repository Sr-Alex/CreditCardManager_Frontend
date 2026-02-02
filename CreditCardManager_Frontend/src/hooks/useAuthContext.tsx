import { useContext } from "react";

import AuthContext, { type AuthContextImp } from "../contexts/authContext";

function useAuthContext(): AuthContextImp {
	return useContext(AuthContext);
}

export default useAuthContext;
