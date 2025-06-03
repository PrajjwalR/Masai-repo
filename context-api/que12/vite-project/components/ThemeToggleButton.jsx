import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: theme === 'dark' ? '#444' : '#ddd',
        color: theme === 'dark' ? '#fff' : '#000',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '1rem',
      }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggleButton;

