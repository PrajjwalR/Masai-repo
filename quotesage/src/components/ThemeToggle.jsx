export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}