import { User } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";

import Container from "../container";
import ActionButton from "../actionButton";

interface UserDefinitionsProps {
	userDefinitionsHandler: () => void;
}

function UserDefinitions({ userDefinitionsHandler }: UserDefinitionsProps) {
	const { user, logout } = useAuthContext();

	const handleLogout = () => {
		logout();
		userDefinitionsHandler();
	};

	return (
		<Container
			title="Dados de usuário:"
			closeButton={true}
			closeButtonHandler={userDefinitionsHandler}>
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
