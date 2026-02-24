import { Plus } from "lucide-react";

import type { CardUserDTO } from "../../api/dtos/cardUsersDtos";

import useFetchCardUsers from "../../hooks/useFetchCardUsers";

import useModalContext from "../../hooks/useModalContext";

import horizontalScroll from "../../utils/horizontalScroll";

import Container from "../container";
import ActionButton from "../actionButton";
import CardUserShowData from "./cardUserShowData";
import AddUserFormContainer from "./addCardUserContainer";

function UserList() {
	const cardUsers = useFetchCardUsers();
	const { openModal } = useModalContext();

	return (
		<Container
			title={"Lista de usuários"}
			description={"Gerencie os usuários do sistema"}>
			<div className="block w-fit ml-auto">
				<ActionButton
					onClick={() => openModal(<AddUserFormContainer />)}
					backgroundColor="bg-transparent">
					<Plus
						size={"2rem"}
						className="text-dark-slate dark:text-light-gray"
					/>
				</ActionButton>
			</div>

			<ul
				onWheel={(event) => horizontalScroll(event)}
				className="flex p-2 gap-2 overflow-x-auto scrollbar-hide">
				{cardUsers.length > 0 &&
					cardUsers.map((cardUser: CardUserDTO, index) => (
						<CardUserShowData key={index} cardUser={cardUser} />
					))}
			</ul>
		</Container>
	);
}

export default UserList;
