import { useState } from "react";
import { User } from "lucide-react";

import useAuthContext from "../../hooks/useAuthContext";

import Container from "../container";
import AbsoluteContainer from "../absoluteContainer";
import UserDefinitions from "./userDefinitions";

function UserData() {
	const { user } = useAuthContext();
	const [showUserDefinitions, setShowUserDefinitions] =
		useState<boolean>(false);

	return (
		<Container className="aspect-square h-full hover:bg-light-gray dark:hover:bg-dark-slate">
			<button
				onClick={() => setShowUserDefinitions(true)}
				className="block w-full cursor-pointer">
				<figure>
					<User className="mx-auto" size={"3rem"} />
				</figure>
				<div className="w-fit mx-auto mt-2">
					<p>{user?.userName}</p>
				</div>
			</button>

			{showUserDefinitions && (
				<AbsoluteContainer>
					<UserDefinitions
						userDefinitionsHandler={() =>
							setShowUserDefinitions(false)
						}
					/>
				</AbsoluteContainer>
			)}
		</Container>
	);
}

export default UserData;
