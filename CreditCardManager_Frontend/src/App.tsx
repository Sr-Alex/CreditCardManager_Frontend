import { useEffect, useState } from "react";

import { GetAuthToken } from "./api/client";
import { GetUser } from "./api/services/userServices";

import LoginContext from "./contexts/loginContext";

import { type UserDTO } from "./api/dtos/userDtos";

import Header from "./components/header";
import CardSummary from "./components/CardSummary";
import UserList from "./components/userList";
import AbsoluteContainer from "./components/absoluteContainer";
import AuthForm from "./components/forms/authForm";
import UserCardsSelect from "./components/userCardsSelect";

import "./App.css";
import type { CreditCardDTO } from "./api/dtos/creditCardDtos";

function App() {
	const [isLogged, setIsLogged] = useState<boolean>(false);
	const [user, setUser] = useState<UserDTO | undefined>(undefined);
	const [card, setCard] = useState<CreditCardDTO | undefined>(undefined);

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
		<main className="app">
			<LoginContext
				value={{
					isLogged,
					setIsLogged,
					user,
					setUser,
					card,
					setCard,
				}}>
				<Header />
				<CardSummary />
				<UserList />
				{(!isLogged || !card) && (
					<AbsoluteContainer>
						{!isLogged ? <AuthForm /> : <UserCardsSelect />}
					</AbsoluteContainer>
				)}
			</LoginContext>
		</main>
	);
}

export default App;
