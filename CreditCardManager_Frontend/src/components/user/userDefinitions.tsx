import { User } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";
import useCardContext from "../../hooks/useCardContext";
import useModalContext from "../../hooks/useModalContext";

import Container from "../container";
import ActionButton from "../actionButton";
import AuthFormContainer from "../auth/authFormContainer";

function UserDefinitions() {
	const { user, logout } = useAuthContext();
	const { clearCard } = useCardContext();
	const { openModal } = useModalContext();

	const handleLogout = () => {
		logout();
		clearCard();
		openModal(<AuthFormContainer />);
	};

	return (
		<Container title="Dados de usuário:" className="modal" closeButton>
			<figure className="w-full">
				<User className="mx-auto mb-4" size={"3rem"} />
			</figure>
			<div className="mb-6">
				<div className="text-center">
					<p className="input-text font-bold">
						{user?.userName && user.userName.length > 50
							? user.userName.slice(0, 50) + "..."
							: user?.userName}
					</p>
					<p className="input-text">{user?.email}</p>
				</div>
			</div>

			<ActionButton
				onClick={handleLogout}
				className="form-button"
				backgroundColor="bg-red">
				LogOut
			</ActionButton>
		</Container>
	);
}

export default UserDefinitions;
