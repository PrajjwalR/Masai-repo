import { useContext } from 'react';
import { ChakraProvider, Box, Flex, Grid, Button, extendTheme } from '@chakra-ui/react';
import { AuthContextProvider, AuthContext } from '../context/AuthContext';
import { ThemeContextProvider, ThemeContext } from '../context/ThemeContext';

function AppWrapper() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const bgColor = theme === 'light' ? 'gray.100' : 'gray.700';
  const cardBg = theme === 'light' ? 'gray.200' : 'gray.600';
  const footerBg = theme === 'light' ? 'gray.300' : 'gray.800';
  const textColor = theme === 'light' ? 'black' : 'white';

  const customTheme = extendTheme({
    styles: {
      global: {
        body: {
          bg: theme === 'light' ? 'white' : 'gray.900',
          color: textColor,
        },
      },
    },
  });

  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        as="nav"
        p="4"
        bg={bgColor}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap="4"
        p="4"
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box
            key={card}
            p="6"
            shadow="md"
            bg={cardBg}
            borderRadius="md"
            textAlign="center"
          >
            {card}
          </Box>
        ))}
      </Grid>

      <Box as="footer" p="4" bg={footerBg} textAlign="center" color={textColor}>
        {isLoggedIn ? 'Welcome, User!' : 'Please log in'}
      </Box>
    </ChakraProvider>
  );
}

export default AppWrapper;
