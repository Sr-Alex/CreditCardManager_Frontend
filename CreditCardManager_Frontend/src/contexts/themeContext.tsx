import { createContext, useEffect, useState, type ReactNode } from "react";

export interface ThemeContextImp {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextImp>({
	darkMode: false,
	toggleDarkMode: () => {},
});

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
			setDarkMode(true);
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
