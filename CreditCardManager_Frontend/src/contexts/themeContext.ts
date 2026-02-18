import { createContext } from "react";

export interface ThemeContextImp {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextImp>({
	darkMode: false,
	toggleDarkMode: () => {},
});

export default ThemeContext;
