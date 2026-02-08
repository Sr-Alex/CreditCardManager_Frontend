import "./App.css";

import ThemeContextProvider from "./contexts/themeContextProvider";
import AuthContextProvider from "./contexts/authContextProvider";

import UserSet from "./components/user/userSet";
import Header from "./components/header";
import CardSummary from "./components/card/CardSummary";
import UserList from "./components/user/userList";
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
