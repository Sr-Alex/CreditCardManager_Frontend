import { User } from "lucide-react";
import type { UserDTO } from "../api/dtos/userDtos";

interface CardUserProps {
	user: UserDTO;
}

function CardUser({ user }: CardUserProps) {
	return (
		<li className="p-2">
			<User size={"4rem"} className="inline-block text-dark-blue" />
			<div className="inline-block">
				<p>{user.userName}</p>
			</div>
		</li>
	);
}

export default CardUser;
