import { useEffect, useState } from "react";

import useAuthContext from "../hooks/useAuthContext";

import { GetCreditCardUsers } from "../api/services/creditCardServices";

import type { CardUserDTO } from "../api/dtos/cardUsersDtos";

import Container from "./container";
import ShowCardUser from "./showCardUser";

function UserList() {
	const { card } = useAuthContext();

	const [users, setUsers] = useState<CardUserDTO[]>([]);

	const handleWheel = (event: React.WheelEvent) => {
		const SCROLL_VALUE: number = 100;

		event.currentTarget.scrollLeft =
			event.deltaY > 0
				? event.currentTarget.scrollLeft + SCROLL_VALUE
				: event.currentTarget.scrollLeft - SCROLL_VALUE;
	};

	const handleGetUsers = async () => {
		if (!card) return;

		GetCreditCardUsers(card.id).then((response) => {
			if (response.success) {
				setUsers(response.data as CardUserDTO[]);
			}
		});
	};

	useEffect(() => {
		handleGetUsers();
	}, [card]);

	return (
		<Container
			title={"Lista de usuários"}
			description={"Gerencie os usuários do sistema"}>
			<ul
				onWheel={(event) => handleWheel(event)}
				className="flex gap-4 overflow-x-auto scrollbar-hide">
				{users.map((cardUser: CardUserDTO, index) => (
					<ShowCardUser key={index} cardUser={cardUser} />
				))}
			</ul>
		</Container>
	);
}
export default UserList;
