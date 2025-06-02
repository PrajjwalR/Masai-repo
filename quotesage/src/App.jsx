import { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import QuoteButton from './components/QuoteButton';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export default function App() {
  const [quoteData, setQuoteData] = useState({ q: '', a: '' });
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('lg');

  const fetchQuote = async () => {
    try {
      const res = await axios.get('https://zenquotes.io/api/random');
      setQuoteData(res.data[0]);
    } catch (err) {
      console.error('Error fetching quote:', err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className={`app ${theme}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="quote-container">
        <QuoteCard 
          quote={quoteData.q} 
          author={quoteData.a} 
          fontSize={fontSize} 
          theme={theme} 
        />

        <QuoteButton onClick={fetchQuote}>New Quote</QuoteButton>

        <div className="font-selector">
          <label className="font-label">Font Size:</label>
          <select 
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
            className="font-select"
          >
            <option value="sm">Small</option>
            <option value="base">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">XL</option>
          </select>
        </div>
      </div>
    </div>
  );
} 