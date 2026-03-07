import useLocalStorage from "../../hooks/useLocalStorage";
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";

const ICON_SIZE = 24;

export default function Header() {
  const [theme, setTheme] = useLocalStorage("theme", "");

  const handleSwitchTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <header className="max-w-3xl mx-auto flex items-center justify-between p-4 md:py-8 md:px-4">
      <h1 className="text-4xl md:text-5xl font-bold">LuckyPick</h1>
      <div className="flex items-center gap-3">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/renans2/lucky-pick"
          className="hover:underline"
        >
          GitHub
        </a>

        <button
          onClick={handleSwitchTheme}
          className="cursor-pointer hover:scale-110 transition"
        >
          {theme === "dark" ? (
            <IoSunny size={ICON_SIZE} />
          ) : (
            <IoMdMoon size={ICON_SIZE} />
          )}
        </button>
      </div>
    </header>
  );
}
