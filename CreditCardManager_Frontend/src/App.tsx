import Header from "./components/header";
import UserList from "./components/userList";

import "./App.css";
import { CreateUser, GetUser } from "./api/services/userServices";

function App() {
	return (
		<main>
			<Header />
			<UserList />
			<button
				type="button"
				onClick={() =>
					CreateUser({
						userName: "newuser",
						email: "newuser@example.com",
						password: "defaultPassword123",
					})
				}>
				Add User
			</button>
			<button type="button" onClick={() => GetUser(1)}>
				Get User
			</button>
		</main>
	);
}

export default App;
