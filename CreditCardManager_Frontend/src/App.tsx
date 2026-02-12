import "./App.css";

import ThemeContextProvider from "./contexts/themeContextProvider";
import AuthContextProvider from "./contexts/authContextProvider";

import UserSet from "./components/user/userSet";
import Header from "./components/header";
import Definitions from "./components/definitions";
import UserList from "./components/user/userList";
import DebtHistory from "./components/debt/debtHistory";

function App() {
	return (
		<main className="app bg-light-gray dark:bg-dark-slate">
			<ThemeContextProvider>
				<AuthContextProvider>
					<UserSet />
					<Header />
					<div className="w-full h-fit flex flex-col flex-nowrap content-start gap-6 md:flex-row-reverse">
						<Definitions />
						<div className="flex flex-col gap-6">
							<UserList />
							<DebtHistory />
						</div>
					</div>
				</AuthContextProvider>
			</ThemeContextProvider>
		</main>
	);
}

export default App;
