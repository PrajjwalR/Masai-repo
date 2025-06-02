import { useState } from 'react';

export default function QuoteCard({ quote, author, fontSize, theme }) {
  const [liked, setLiked] = useState(false);

  const fontSizes = {
    sm: '1rem',
    base: '1.2rem',
    lg: '1.5rem',
    xl: '1.8rem',
  };

  return (
    <div className={`quote-card ${theme}`}> 
      <p style={{ fontSize: fontSizes[fontSize] }} className="quote-text">“{quote}”</p>
      <p className="quote-author">— {author || 'Unknown'}</p>
      <button 
        onClick={() => setLiked(!liked)} 
        className={`like-button ${liked ? 'liked' : ''}`}
      >
        {liked ? '❤️' : '🤍'}
      </button>
    </div>
  );
}