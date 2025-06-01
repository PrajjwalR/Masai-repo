import { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import QuoteButton from './components/QuoteButton';
import ThemeToggle from './components/ThemeToggle';
import '/Users/Prajjwal/masai-repo/quotesage/src/App.css'

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
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <div className="max-w-xl mx-auto text-center mt-20">
        <QuoteCard 
          quote={quoteData.q} 
          author={quoteData.a} 
          fontSize={fontSize} 
          theme={theme} 
        />

        <QuoteButton onClick={fetchQuote}>New Quote</QuoteButton>

        <div className="mt-4">
          <label className="mr-2 font-semibold">Font Size:</label>
          <select 
            value={fontSize} 
            onChange={(e) => setFontSize(e.target.value)}
            className="border p-1 rounded"
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
