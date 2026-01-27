import { useContext } from "react";
import AuthContext, { type IAuthContext } from "../contexts/authContext";

export function useAuthContext(): IAuthContext {
	return useContext(AuthContext);
}
