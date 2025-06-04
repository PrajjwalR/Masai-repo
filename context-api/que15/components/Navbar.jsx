import { Flex, Button, Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useThemeCtx } from '../context/ThemeContext';

export default function Navbar() {
  const { isLoggedIn, toggleAuth } = useAuth();
  const { theme, toggleTheme } = useThemeCtx();

  return (
    <Flex justify="space-between" align="center" p={4} bg={theme === 'light' ? 'gray.200' : 'gray.800'}>
      <Text fontWeight="bold">{isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
      <Flex gap={4}>
        <Button onClick={toggleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
        <Button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</Button>
      </Flex>
    </Flex>
  );
}