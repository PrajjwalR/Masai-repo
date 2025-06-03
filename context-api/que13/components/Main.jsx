import { useAuth } from '../context/AuthContext';

const Main = () => {
  const { isLoggedIn } = useAuth();

  return (
    <main style={styles.main}>
      <h3>{isLoggedIn ? 'You are logged in!' : 'Please login to continue.'}</h3>
    </main>
  );
};

const styles = {
  main: {
    padding: '2rem',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};

export default Main;
