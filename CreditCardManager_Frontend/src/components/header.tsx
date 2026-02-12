import { CreditCard, Moon, Sun } from "lucide-react";

import ActionButton from "./actionButton";
import useThemeProvider from "../hooks/useThemeContext";

function Header() {
	const { darkMode, toggleDarkMode } = useThemeProvider();

	return (
		<header className="flex justify-between items-center w-full h-fit px-1 mb-8 bg-dark text-dark-slate dark:text-white">
			<div className="flex justify-center items-center gap-2">
				<div className="p-4 icon-container rounded bg-blue">
					<CreditCard size={"1.5rem"} color="var(--color-white)" />
				</div>
				<div className="block">
					<h1>CreditCard Manager</h1>
					<p>Controle seus gastos do cartão de crédito.</p>
				</div>
			</div>
			<ActionButton
				type="button"
				onClick={() => toggleDarkMode()}
				className="p-2 icon-container rounded-full box-shadow border border-off-white dark:border-dark-blue"
				backgroundColor="bg-white dark:bg-dark-blue">
				{darkMode ? (
					<Sun size={"1.5rem"} color="var(--color-white" />
				) : (
					<Moon size={"1.5rem"} color="var(--color-dark-slate" />
				)}
			</ActionButton>
		</header>
	);
}

export default Header;
