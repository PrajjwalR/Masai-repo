import { useState } from 'react';

export default function QuoteCard({ quote, author, fontSize, theme }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={`rounded-xl p-6 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <p className={`text-${fontSize} font-medium`}>“{quote}”</p>
      <p className="mt-2 text-right font-semibold">— {author || 'Unknown'}</p>
      <button 
        onClick={() => setLiked(!liked)} 
        className="mt-4 text-red-500 hover:text-red-600 text-xl"
      >
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
