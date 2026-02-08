import { useEffect, useState, type ReactNode } from "react";

import ThemeContext from "./themeContext";

export function ThemeContextProvider({ children }: { children: ReactNode }) {
	const [darkMode, setDarkMode] = useState<boolean>(false);

	const toggleDarkMode = (
		enableDarkMode: boolean | undefined = undefined,
	) => {
		if (enableDarkMode) {
			setDarkMode(enableDarkMode);
			return;
		}
		setDarkMode(!darkMode);
	};

	useEffect(() => {
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			return () => setDarkMode(true);
		}
	}, []);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const values = {
		darkMode,
		toggleDarkMode,
	};

	return <ThemeContext value={values}>{children}</ThemeContext>;
}

export default ThemeContextProvider;
