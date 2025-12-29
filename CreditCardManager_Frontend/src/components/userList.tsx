import { useContext, useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import AuthContext from "../contexts/authContext";

import Container from "./container";
import CardUser from "./cardUser";

function UserList() {
	const { card } = useContext(AuthContext);
	const [users, setUsers] = useState(Array<UserDTO>());

	const handleWheel = (event: React.WheelEvent) => {
		event.currentTarget.scrollLeft =
			event.deltaY > 0
				? event.currentTarget.scrollLeft + 100
				: event.currentTarget.scrollLeft - 100;
	};

	const handleGetUsers = async () => {
		if (!card) return;

		const data = await GetCreditCardUsers(card.id);
		if (data && Array.isArray(data)) {
			setUsers(data);
		}
	};

	useEffect(() => {
		handleGetUsers();
	}, [card]);

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
