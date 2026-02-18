import { User } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";
import useModalContext from "../../hooks/useModalContext";

import Container from "../container";
import ActionButton from "../actionButton";

function UserDefinitions() {
	const { user, logout } = useAuthContext();
	const { closeModal } = useModalContext();

	const handleLogout = () => {
		logout();
		closeModal();
	};

	return (
		<Container title="Dados de usuário:" className="modal" closeButton>
			<figure className="w-full">
				<User className="mx-auto mb-4" size={"4rem"} />
			</figure>
			<div className="mb-6">
				<div className="text-center">
					<p className="input-text font-bold">{user?.userName}</p>
					<p className="input-text">{user?.email}</p>
				</div>
			</div>
			<ActionButton
				onClick={handleLogout}
				className="p-2 rounded-lg"
				backgroundColor="bg-red">
				LogOut
			</ActionButton>
		</Container>
	);
}

export default UserDefinitions;
