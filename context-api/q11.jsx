import { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Props Drilling Example</h1>
      <input
        type="text"c
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <Main name={name} />
    </div>
  );
}

//  1
function Main({ name }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Main Component</h2>
      <MainRight name={name} />
    </div>
  );
}

//  2
function MainRight({ name }) {
  return (
    <div style={{ marginLeft: '2rem' }}>
      <h3>MainRight Component</h3>
      <BottomMainRight name={name} />
    </div>
  );
}

//  3
function BottomMainRight({ name }) {
  return (
    <div style={{ marginLeft: '4rem', marginTop: '1rem' }}>
      <h4>BottomMainRight Component</h4>
      <p>Hello, <strong>{name || 'Guest'}</strong>!</p>
    </div>
  );
}
