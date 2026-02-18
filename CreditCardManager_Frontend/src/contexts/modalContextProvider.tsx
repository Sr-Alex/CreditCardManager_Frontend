import { useState, type ReactNode } from "react";

import ModalContext from "./ModalContext";
import ModalContainer from "../components/modalContainer";

function ModalContexTProvider({ children }: { children: ReactNode }) {
	const [modalContent, setModalContent] = useState<ReactNode | undefined>();
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (content: ReactNode) => {
		setModalContent(content);
		setIsOpen(true);
	};

	const closeModal = () => {
		setModalContent(undefined);
		setIsOpen(false);
	};

	const values = { isOpen, openModal, closeModal };

	return (
		<ModalContext value={values}>
			{isOpen && <ModalContainer>{modalContent}</ModalContainer>}
			{children}
		</ModalContext>
	);
}

export default ModalContexTProvider;
