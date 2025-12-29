import { AuthContextProvider } from "./contexts/authContext";

import Header from "./components/header";
import CardSummary from "./components/card/CardSummary";
import UserList from "./components/userList";

import "./App.css";
import UserSet from "./components/userSet";

function App() {
	return (
		<main className="app">
			<AuthContextProvider>
				<Header />
				<CardSummary />
				<UserList />
				<UserSet />
			</AuthContextProvider>
		</main>
	);
}

export default App;
