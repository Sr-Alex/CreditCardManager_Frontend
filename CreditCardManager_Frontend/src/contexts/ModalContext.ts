import { createContext, type ReactNode } from "react";

export interface ModalContextImp {
	isOpen: boolean;
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}

const DEFAULT_MODALCONTEXT: ModalContextImp = {
	isOpen: false,
	openModal: () => {},
	closeModal: () => {},
};

const ModalContext = createContext<ModalContextImp>(DEFAULT_MODALCONTEXT);

export default ModalContext;
