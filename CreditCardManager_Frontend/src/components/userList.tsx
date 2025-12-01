import { useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import Container from "./container";

function UserList({ cardId }: { cardId: number | undefined }) {
	const [users, setUsers] = useState(Array<UserDTO>());

	const handleGetUsers = async () => {
		if (cardId === undefined) return;

		const data = await GetCreditCardUsers(cardId);
		if (data.users && Array.isArray(data.users)) {
			setUsers(data.users);
		}
	};

	useEffect(() => {
		handleGetUsers();
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
