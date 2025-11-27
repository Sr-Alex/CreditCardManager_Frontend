import { useState } from "react";

function LoginForm() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const handleReset = () => {
		setUserName("");
		setPassword("");
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<form
			onSubmit={handleLogin}
			className="flex"
			style={{ flexDirection: "column", gap: "0.75rem" }}>
			<div>
				<label htmlFor="username">UserName:</label>
				<input
					type="text"
					id="username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					className="block"
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="block"
				/>
			</div>
			<div>
				<button
					className="formButton rounded-full bg-blue"
					type="button"
					onClick={handleReset}>
					Reset
				</button>
				<button
					type="submit"
					onClick={handleLogin}
					className="formButton rounded-full bg-blue">
					Login
				</button>
			</div>
		</form>
	);
}
export default LoginForm;
