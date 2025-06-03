import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggleButton from '../components/ThemeToggleButton';
import ThemedBox from '../components/ThemedBox';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '2rem' }}>
        <h1>React Context API - Theme Toggle</h1>
        <ThemeToggleButton />
        <ThemedBox />
      </div>
    </ThemeProvider>
  );
}

export default App;
