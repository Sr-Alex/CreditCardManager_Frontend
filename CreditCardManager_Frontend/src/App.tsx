import "./App.css";

import ThemeContextProvider from "./contexts/themeContextProvider";
import AuthContextProvider from "./contexts/authContextProvider";
import ModalContexTProvider from "./contexts/modalContextProvider";

import Header from "./components/header";
import Definitions from "./components/definitions";
import UserList from "./components/user/userList";
import DebtHistory from "./components/debt/debtHistory";

function App() {
	return (
		<div className="app bg-light-gray dark:bg-dark-slate">
			<ThemeContextProvider>
				<AuthContextProvider>
					<Header />
					<main className="w-full h-fit px-2 py-1 flex flex-col flex-nowrap content-start gap-6 md:flex-row-reverse">
						<ModalContexTProvider>
							<Definitions />
							<div className="flex-3 flex flex-col gap-6">
								<UserList />
								<DebtHistory />
							</div>
						</ModalContexTProvider>
					</main>
				</AuthContextProvider>
			</ThemeContextProvider>
		</div>
	);
}

export default App;
