import { useEffect, useState } from "react";

import { GetAuthToken } from "./api/client";
import { GetUser } from "./api/services/userServices";

import LoginContext from "./contexts/loginContext";

import { type UserDTO } from "./api/dtos/userDtos";

import Header from "./components/header";
import UserList from "./components/userList";
import AbsoluteContainer from "./components/absoluteContainer";
import AuthForm from "./components/forms/authForm";

import "./App.css";
import UserCardsSelect from "./components/userCardsSelect";

function App() {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<UserDTO | undefined>(undefined);
	const [cardId, setCardId] = useState<number | undefined>(undefined);

	useEffect(() => {
		const auth = GetAuthToken();
		if (auth?.token && auth?.userId) {
			setIsLogged(true);
			GetUser(auth.userId).then((userData) => {
				setUser(userData as UserDTO);
			});
		}
	}, []);

	return (
		<main>
			<LoginContext value={{ isLogged, setIsLogged, user, setUser, cardId, setCardId }}>
				<Header />
				<UserList />
				{(!isLogged || !cardId) && (
					<AbsoluteContainer>
						{!isLogged ? <AuthForm /> : <UserCardsSelect />}
					</AbsoluteContainer>
				)}
			</LoginContext>
		</main>
	);
}

export default App;
