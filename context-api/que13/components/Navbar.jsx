import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useAuth();

  return (
    <nav style={styles.nav}>
      <h2>MyApp</h2>
      <button onClick={toggleAuth} style={styles.button}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;
