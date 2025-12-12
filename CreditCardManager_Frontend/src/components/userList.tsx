import { useContext, useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import Container from "./container";
import LoginContext from "../contexts/loginContext";
import CardUser from "./cardUser";

function UserList() {
	const context = useContext(LoginContext);
	const [users, setUsers] = useState(Array<UserDTO>());

	const handleWheel = (event: React.WheelEvent) => {
		event.currentTarget.scrollLeft =
			event.deltaY > 0
				? event.currentTarget.scrollLeft + 100
				: event.currentTarget.scrollLeft - 100;
	};

	const handleGetUsers = async () => {
		const cardId = context?.cardId;
		if (!cardId) return;

		const data = await GetCreditCardUsers(cardId);
		if (data && Array.isArray(data)) {
			setUsers(data);
		}
	};

	useEffect(() => {
		handleGetUsers();
	}, [context?.cardId]);

	return (
		<Container
			Title="Lista de usuários"
			Description="Gerencie os usuários do sistema">
			<ul
				onWheel={(event) => handleWheel(event)}
				className="flex gap-4 overflow-x-auto scrollbar-hide">
				{users.map((user: UserDTO) => (
					<CardUser key={user.id} user={user} />
				))}
			</ul>
		</Container>
	);
}
export default UserList;
