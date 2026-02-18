import { User } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";

import Container from "../container";
import useModalContext from "../../hooks/useModalContext";
import UserDefinitions from "./userDefinitions";

function UserData() {
	const { user } = useAuthContext();
	const { openModal } = useModalContext();

	const handleClick = () => {
		openModal(<UserDefinitions />);
	};

	return (
		<Container
			backgroundColor="bg-light-gray hover:bg-dark-gray dark:bg-dark-blue dark:hover:bg-dark-slate"
			textColor="text-dark-slate hover:text-light-gray dark:text-light-gray dark:hover:text-light-gray"
			className="h-fit">
			<button
				onClick={handleClick}
				className="block w-full h-full cursor-pointer">
				<figure>
					<User className="mx-auto" size={"3rem"} />
				</figure>
				<div className="w-fit mx-auto mt-2">
					<p>{user?.userName}</p>
				</div>
			</button>
		</Container>
	);
}

export default UserData;
