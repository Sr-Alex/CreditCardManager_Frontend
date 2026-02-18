import { useContext } from "react";
import type { ModalContextImp } from "../contexts/ModalContext";
import ModalContext from "../contexts/ModalContext";

function useModalContext(): ModalContextImp {
	return useContext(ModalContext);
}

export default useModalContext;
