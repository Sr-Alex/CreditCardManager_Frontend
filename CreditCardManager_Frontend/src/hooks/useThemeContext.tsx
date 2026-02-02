import { useContext } from "react";

import { ThemeContext, type ThemeContextImp } from "../contexts/themeContext";

function useThemeProvider(): ThemeContextImp {
	return useContext(ThemeContext);
}

export default useThemeProvider;
