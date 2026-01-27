import { useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import { useAuthContext } from "../hooks/useAuthContext";

import Container from "./container";
import CardUser from "./cardUser";

interface UserListProps {
	title?: string;
	description?: string;
}

function UserList({
	title = "Lista de usuários",
	description = "Gerencie os usuários do sistema",
}: UserListProps) {
	const { card } = useAuthContext();
	const [users, setUsers] = useState(Array<UserDTO>());

	const handleWheel = (event: React.WheelEvent) => {
		const SCROLL_VALUE: number = 100;

		event.currentTarget.scrollLeft =
			event.deltaY > 0
				? event.currentTarget.scrollLeft + SCROLL_VALUE
				: event.currentTarget.scrollLeft - SCROLL_VALUE;
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
		<Container title={title} description={description}>
			<ul
				onWheel={(event) => handleWheel(event)}
				className="flex gap-4 overflow-x-auto scrollbar-hide">
				{users.map((user: UserDTO, index) => (
					<CardUser key={index} user={user} />
				))}
			</ul>
		</Container>
	);
}
export default UserList;
