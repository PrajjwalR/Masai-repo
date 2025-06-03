import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer style={styles.footer}>
      {isLoggedIn ? 'Welcome, User' : 'Please log in'}
    </footer>
  );
};

const styles = {
  footer: {
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
};

export default Footer;
