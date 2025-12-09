import { User } from "lucide-react";
import type { UserDTO } from "../api/dtos/userDtos";

interface CardUserProps {
	user: UserDTO;
}

function CardUser({ user }: CardUserProps) {
	return (
		<li>
			<User size={"4rem"} style={{ color: "var(--color-dark-blue)" }} />
			<div>
				<p>{user.userName}</p>
			</div>
		</li>
	);
}

export default CardUser;
