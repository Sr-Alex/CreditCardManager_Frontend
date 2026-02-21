import useModalContext from "../hooks/useModalContext";
import ActionButton from "./actionButton";

import Container from "./container";

interface confirmModalImp {
	onConfirm: () => void;
}

function ConfirmModal({ onConfirm }: confirmModalImp) {
	const { closeModal } = useModalContext();

	return (
		<Container title="Você tem certeza?" className="modal">
			<ActionButton onClick={() => onConfirm()} className="form-button">
				Sim
			</ActionButton>
			<ActionButton onClick={() => closeModal()} className="form-button">
				Não
			</ActionButton>
		</Container>
	);
}

export default ConfirmModal;
