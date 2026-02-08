import { User } from "lucide-react";

import type { CardUserDTO } from "../../api/dtos/cardUsersDtos";

interface CardUserShowDataProps {
	cardUser: CardUserDTO;
}

function CardUserShowData({ cardUser }: CardUserShowDataProps) {
	return (
		<li>
			<User size={"4rem"} />
			<div>
				<p>{cardUser.UserName}</p>
				<p>{cardUser.DebtsCount}</p>
			</div>
		</li>
	);
}

export default CardUserShowData;
