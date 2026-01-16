import { AuthContextProvider } from "./contexts/authContext";

import "./App.css";

import UserSet from "./components/userSet";
import Header from "./components/header";
import CardSummary from "./components/card/CardSummary";
import UserList from "./components/userList";
import DebtHistory from './components/debt/debtHistory';


function App() {
	return (
		<main className="app">
			<AuthContextProvider>
				<UserSet />
				<Header />
				<CardSummary />
				<UserList />
				<DebtHistory />
			</AuthContextProvider>
		</main>
	);
}

export default App;
