import { useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import Container from "./container";

function UserList({ cardId }: { cardId: number }) {
	const [users, setUsers] = useState(Array<UserDTO>());

	useEffect(() => {
		GetCreditCardUsers(cardId).then((data) => {
			if (data.users && Array.isArray(data.users)) {
				setUsers(data.users);
			}
		});
	}, [cardId]);

	return (
		<Container
			Title="Lista de usuários"
			Description="Gerencie os usuários do sistema">
			<ul>
				{users.map((user: UserDTO) => (
					<li key={user.Id}>{user.UserName}</li>
				))}
			</ul>
		</Container>
	);
}
export default UserList;
