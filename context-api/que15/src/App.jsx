import { ChakraProvider, Flex } from '@chakra-ui/react';
import { AuthContextProvider } from '../context/AuthContext';
import { ThemeContextProvider, useThemeCtx } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

function AppContent() {
  return (
    <Flex direction="column" minH="100vh">
      <Navbar />
      <Flex flex="1">
        <Sidebar />
        <MainContent />
      </Flex>
      <Footer />
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <AppContent />
        </AuthContextProvider>
      </ThemeContextProvider>
    </ChakraProvider>
  );
}

export default App;