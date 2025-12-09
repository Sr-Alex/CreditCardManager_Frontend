import { useContext, useEffect, useState } from "react";

import { GetCreditCardUsers } from "../api/services/creditCardServices";
import type { UserDTO } from "../api/dtos/userDtos";

import Container from "./container";
import LoginContext from "../contexts/loginContext";
import CardUser from "./cardUser";

function UserList() {
	const context = useContext(LoginContext);
	const [users, setUsers] = useState(Array<UserDTO>());

	const handleGetUsers = async () => {
		const cardId = context?.cardId;
		if (cardId) return;

		const data = await GetCreditCardUsers(cardId!);
		if (data.users && Array.isArray(data.users)) {
			setUsers(data.users);
		}
	};

	useEffect(() => {
		handleGetUsers();
	}, [context?.cardId]);

	return (
		<Container
			Title="Lista de usuários"
			Description="Gerencie os usuários do sistema">
			<ul className="flex">
				{/* {users.map((user: UserDTO) => (
					<li key={user.id}>{user.userName}</li>
				))} */}
				<CardUser
					user={{
						"id": 0,
						"userName": "usuário01",
						"email": "usuario01@gmail.com",
					}}
				/>
				<CardUser
					user={{
						"id": 1,
						"userName": "usuário02",
						"email": "usuario01@gmail.com",
					}}
				/>
				<CardUser
					user={{
						"id": 2,
						"userName": "usuário03",
						"email": "usuario01@gmail.com",
					}}
				/>
			</ul>
		</Container>
	);
}
export default UserList;
