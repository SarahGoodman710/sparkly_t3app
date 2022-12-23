import { useTheme } from "../lib/theme";
import { BsFillSunFill, BsFillCloudMoonFill } from "react-icons/bs";

function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleDarkMode = () => {
    localStorage.setItem("supabaseDarkMode", (!isDarkMode).toString());
    toggleTheme();

    const key = localStorage.getItem("supabaseDarkMode");
    document.documentElement.className = key === "true" ? "dark" : "";
  };

  return (
    <button
      className="p-1 text-gray-400 hover:text-black focus:outline-none dark:hover:text-white"
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? (
        <BsFillSunFill size={22} />
      ) : (
        <BsFillCloudMoonFill size={22} />
      )}
    </button>
  );
}

export default DarkModeToggle;
