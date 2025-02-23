import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
	isLightMode: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLightMode, setIsLightMode] = useState(() => {
		return (
			localStorage.getItem("theme") === "light" ||
			localStorage.getItem("theme") === null
		);
	});

	useEffect(() => {
		if (isLightMode) {
			document.documentElement.classList.add("light");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.remove("light");
			localStorage.setItem("theme", "dark");
		}
	}, [isLightMode]);

	const toggleTheme = () => {
		setIsLightMode((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const ThemeContextUse = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
