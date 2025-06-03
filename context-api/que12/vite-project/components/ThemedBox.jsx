import { useTheme } from '../context/ThemeContext';

const ThemedBox = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#222' : '#eee',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '1rem',
      }}
    >
      <h2>This is a themed box</h2>
      <p>The current theme is <strong>{theme}</strong></p>
    </div>
  );
};

export default ThemedBox;
