import "./App.css";

import { AuthContextProvider } from "./contexts/authContext";
import { ThemeContextProvider } from "./contexts/themeContext";

import UserSet from "./components/userSet";
import Header from "./components/header";
import CardSummary from "./components/card/CardSummary";
import UserList from "./components/userList";
import DebtHistory from "./components/debt/debtHistory";

function App() {
	return (
		<main className="app bg-light-gray dark:bg-dark-slate">
			<ThemeContextProvider>
				<AuthContextProvider>
					<UserSet />
					<Header />
					<CardSummary />
					<UserList />
					<DebtHistory />
				</AuthContextProvider>
			</ThemeContextProvider>
		</main>
	);
}

export default App;
