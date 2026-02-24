import { useContext } from "react";
import CardContext from "../contexts/cardContext";

function useCardContext() {
	const context = useContext(CardContext);

	return context;
}

export default useCardContext;
