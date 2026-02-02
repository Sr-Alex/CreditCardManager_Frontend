import { User } from "lucide-react";

import type { CardUserDTO } from "../api/dtos/cardUsersDtos";

interface CardUserProps {
	cardUser: CardUserDTO;
}

function ShowCardUser({ cardUser }: CardUserProps) {
	return (
		<li className="p-2">
			<User
				size={"4rem"}
				className="inline-block text-dark-blue dark:text-light-gray"
			/>
			<div className="inline-block text-dark-blue dark:text-light-gray">
				<p>{cardUser.UserId}</p>
			</div>
		</li>
	);
}

export default ShowCardUser;
