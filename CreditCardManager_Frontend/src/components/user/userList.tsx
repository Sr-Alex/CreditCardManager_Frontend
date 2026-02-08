import { useState } from "react";

import { Plus } from "lucide-react";

import type { CardUserDTO } from "../../api/dtos/cardUsersDtos";

import useFetchCardUsers from "../../hooks/useFetchCardUsers";

import horizontalScroll from "../../utils/horizontalScroll";
import ActionButton from "../actionButton";

import Container from "../container";
import CardUserShowData from "./cardUserShowData";
import AbsoluteContainer from "../absoluteContainer";
import AddUserForm from "../forms/addUserForm";

function UserList() {
	const cardUsers = useFetchCardUsers();
	const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);

	return (
		<Container
			title={"Lista de usuários"}
			description={"Gerencie os usuários do sistema"}>
			<div className="block w-fit ml-auto">
				<ActionButton
					onClick={() => setShowAddUserForm(!showAddUserForm)}
					backgroundColor="bg-transparent">
					<Plus
						size={"2rem"}
						className="text-dark-slate dark:text-light-gray"
					/>
				</ActionButton>
			</div>
			<ul
				onWheel={(event) => horizontalScroll(event)}
				className="flex gap-4 overflow-x-auto scrollbar-hide">
				{cardUsers.length > 0 &&
					cardUsers.map((cardUser: CardUserDTO, index) => (
						<CardUserShowData key={index} cardUser={cardUser} />
					))}
			</ul>

			{showAddUserForm && (
				<AbsoluteContainer>
					<Container
						title="Adicionar usuário ao cartão: "
						closeButton
						closeButtonHandler={() => setShowAddUserForm(false)}>
						<AddUserForm
							handleAddUserForm={() => setShowAddUserForm(false)}
						/>
					</Container>
				</AbsoluteContainer>
			)}
		</Container>
	);
}

export default UserList;
