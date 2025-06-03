import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Footer from '../components/Footer';

const App = () => {
  return (
    <AuthProvider>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
